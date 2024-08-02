import { Member, Network, permitMe, Stream } from '@jaedag/admin-portal-types'
import {
  updatePaystackCustomerBody,
  transactionTimeBeforeConfirmationRange,
  initiatePaystackCharge,
  isAuth,
  confirmTransactionStatus,
  submitTransactionOTP,
} from '@jaedag/admin-portal-api-core'
import axios from 'axios'
import { Context } from '../utils/neo-types'
import {
  checkTransactionReference,
  getMember,
  initiateOfferingTransaction,
  setTransactionStatusFailed,
  updateTransactionStatus,
} from './payment-cypher'
import { getStreamFinancials } from '../utils/financial-utils'
import { db } from '../firebase-init'
import { throwToSentry } from '../utils/utils'

export const paymentMutations = {
  GiveBacentaOfferingMomo: async (
    source: unknown,
    args: {
      memberEmail: string
      amount: number
      bankingCode: number
      mobileNetwork: Network
      mobileNumber: string
    },
    context: Context
  ) => {
    const session = context.executionContext.session()

    try {
      const memberResponse = await session.executeRead((tx) =>
        tx.run(getMember, args)
      )
      const member: Member =
        memberResponse.records[0]?.get('member')?.properties

      const stream: Stream = memberResponse.records[0]?.get('stream').properties

      const { auth, subaccount } = getStreamFinancials(stream)

      const response = await Promise.all([
        axios(
          initiatePaystackCharge({
            amount: args.amount,
            mobile_money: {
              phone: args.mobileNumber,
              provider: args.mobileNetwork,
            },
            customer: member,
            subaccount,
            auth,
          })
        ),
        member && axios(updatePaystackCustomerBody({ auth, customer: member })),
      ])

      const paymentRes = response[0].data.data
      const memberRef = db.collection('members').doc(member.id)
      await memberRef.set({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phoneNumber: member.phoneNumber,
        whatsappNumber: member.whatsappNumber,
        pictureUrl: member.pictureUrl,
      })

      const dbRes = await Promise.all([
        session.executeWrite((tx) =>
          tx.run(initiateOfferingTransaction, {
            ...args,
            auth: context.auth,
            transactionStatus: paymentRes.status,
            transactionReference: paymentRes.reference,
          })
        ),
        db
          .collection('offerings')
          .doc(paymentRes.reference)
          .set({
            ...args,
            method: 'mobileMoney',
            transactionReference: paymentRes.reference,
            transactionStatus: paymentRes.status,
            createdAt: new Date(),
            createdBy: memberRef,
          }),
      ])

      const cypherRes = dbRes[0]

      return cypherRes.records[0].toObject().transaction.properties
    } catch (error: any) {
      console.error(error)
      throw new Error(`Payment Error: ${error.response?.data.message ?? error}`)
    } finally {
      session.close()
    }
  },

  SendTransactionOTP: async (
    object: any,
    args: {
      reference: string
      otp: string
    },
    context: Context
  ) => {
    isAuth(permitMe('Fellowship'), context.auth.roles)

    const session = context.executionContext.session()

    const transactionResponse = await session.run(
      checkTransactionReference,
      args
    )

    const stream: Stream =
      transactionResponse.records[0]?.get('stream').properties

    const { auth } = getStreamFinancials(stream)

    const otpResponse = await axios(
      submitTransactionOTP({
        auth,
        otp: args.otp,
        reference: args.reference,
      })
    ).catch(async (error) => {
      if (error.response.data.message === 'Charge attempted') {
        console.log('OTP was already sent and charge attempted')

        return transactionResponse.records[0]?.get('transaction').properties
      }

      return throwToSentry('There was an error sending OTP', error)
    })

    if (otpResponse.data.data.status === 'failed') {
      const paymentCypherRes = await session.run(setTransactionStatusFailed, {
        reference: args.reference,
        status: otpResponse.data.data.status,
        error: otpResponse.data.data.gateway_response,
      })

      return paymentCypherRes.records[0]?.get('transaction').properties
    }

    const paymentCypherRes = await session.run(updateTransactionStatus, {
      referece: args.reference,
      otp: args.otp,
    })

    return paymentCypherRes.records[0]?.get('transaction').properties
  },

  ConfirmTransaction: async (
    object: any,
    args: { reference: string },
    context: Context
  ) => {
    const session = context.executionContext.session()

    try {
      const transactionResponse = await session.executeRead((tx) =>
        tx.run(checkTransactionReference, args)
      )

      const transaction =
        transactionResponse.records[0]?.get('transaction').properties
      const stream = transactionResponse.records[0]?.get('stream').properties

      const { auth } = getStreamFinancials(stream)

      const confirmationResponse = await axios(
        confirmTransactionStatus({
          reference: transaction.transactionReference,
          auth,
        })
      )

      if (
        transaction.transactionTime &&
        transactionTimeBeforeConfirmationRange(transaction.transactionTime)
      ) {
        return transaction
      }

      const promises = []
      if (confirmationResponse?.data.data.status === 'success') {
        promises.push(
          session.executeWrite((tx) =>
            tx.run(updateTransactionStatus, {
              ...args,
              transactionStatus: confirmationResponse?.data.data.status,
            })
          )
        )
      }

      if (
        confirmationResponse?.data.data.status === 'failed' ||
        confirmationResponse?.data.data.status === 'abandoned'
      ) {
        promises.push(
          session.executeWrite((tx) =>
            tx.run(setTransactionStatusFailed, {
              ...args,
              transactionStatus: confirmationResponse?.data.data.status,
              failureReason: confirmationResponse?.data.data.gateway_response,
            })
          )
        )
      }

      const labels = transactionResponse.records[0]?.get('transaction').labels

      if (labels.includes('Offering')) {
        promises.push(
          db
            .collection('offerings')
            .doc(transaction.transactionReference)
            .update({
              transactionStatus: confirmationResponse?.data.data.status,
            })
        )
      }

      if (labels.includes('Tithe')) {
        promises.push(
          db.collection('tithes').doc(transaction.transactionReference).update({
            transactionStatus: confirmationResponse?.data.data.status,
          })
        )
      }

      if (labels.includes('BENMP')) {
        promises.push(
          db.collection('benmp').doc(transaction.transactionReference).update({
            transactionStatus: confirmationResponse?.data.data.status,
          })
        )
      }

      await Promise.all(promises)

      const response = await Promise.all(promises)

      console.log(
        "🚀 ~ file: payment-resolvers.ts:264 ~ response[0].records[0]?.get('transaction').properties:",
        response[0].records[0]?.get('transaction').properties
      )
      return { ...response[0].records[0]?.get('transaction').properties }
    } catch (error: any) {
      console.error(error)
      throw new Error(`Payment Error: ${error.response?.data.message ?? error}`)
    } finally {
      session.close()
    }
  },
}

export const paymentQueries = {}
