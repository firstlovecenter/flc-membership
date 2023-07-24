import {
  Member,
  Network,
  PayStackRequestBody,
  Stream,
} from '@jaedag/admin-portal-types'
import {
  initiatePaystackTransaction,
  updatePaystackCustomerBody,
  transactionTimeBeforeConfirmationRange,
} from '@jaedag/admin-portal-api-core'
import axios, { AxiosRequestConfig } from 'axios'
import { Context } from '../utils/neo-types'
import {
  checkTransactionReference,
  getMember,
  initiateOfferingTransaction,
  setTransactionStatus,
  setTransactionStatusFailed,
} from './payment-cypher'
import { getStreamFinancials } from '../utils/financial-utils'
import { db } from '../firebase-init'
import { throwToSentry } from '../utils/utils'

export const paymentMutations = {
  GiveFellowshipOfferingMomo: async (
    source: unknown,
    args: {
      memberId: string
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
        tx.run(getMember, {
          auth: context.auth,
          ...args,
        })
      )
      const member: Member = memberResponse.records[0]?.get('member').properties

      const stream: Stream = memberResponse.records[0]?.get('stream').properties

      const { auth, subaccount } = getStreamFinancials(stream)

      const response = await Promise.all([
        axios(
          initiatePaystackTransaction({
            amount: args.amount,
            mobileNetwork: args.mobileNetwork,
            mobileNumber: args.mobileNumber,
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

      const confirmPaymentBody: AxiosRequestConfig<PayStackRequestBody> = {
        method: 'get',
        baseURL: 'https://api.paystack.co/',
        url: `/transaction/verify/${transaction.transactionReference}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      }

      const confirmationResponse = await axios(confirmPaymentBody).catch(
        async (error) => {
          throwToSentry(
            'There was an error confirming transaction - ',
            JSON.stringify(error.response.data)
          )
        }
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
            tx.run(setTransactionStatus, {
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

      return response[0].records[0]?.get('transaction').properties
    } catch (error: any) {
      console.error(error)
      throw new Error(`Payment Error: ${error.response?.data.message ?? error}`)
    } finally {
      session.close()
    }
  },
}

export const paymentQueries = {}
