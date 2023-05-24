import axios from 'axios'
import {
  Member,
  Network,
  PayStackRequestBody,
  Stream,
} from '@jaedag/admin-portal-types'
import { paystackAxiosReq } from '@jaedag/admin-portal-api-core'
import { Context } from '../utils/neo-types'
import {
  checkTransactionReference,
  getMember,
  initiateOfferingTransaction,
  setTransactionStatusFailed,
} from './payment-cypher'
import { getStreamFinancials } from '../utils/financial-utils'
import { db } from '../firebase-init'

export const paymentMutations = {
  giveFellowshipOfferingMomo: async (
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
      const { iniitiatePaystackTransaction, updatePaystackCustomerBody } =
        paystackAxiosReq

      const response = await Promise.all([
        axios(
          iniitiatePaystackTransaction({
            amount: args.amount,
            mobileNetwork: args.mobileNetwork,
            mobileNumber: args.mobileNumber,
            customer: member,
            subaccount,
            auth,
          })
        ),
        axios(updatePaystackCustomerBody({ auth, customer: member })),
      ])

      const paymentRes = response[0].data.data

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
          .doc(paymentRes.transactionReference)
          .set({
            ...args,
            transactionReference: paymentRes.reference,
            transactionStatus: paymentRes.status,
            createdAt: new Date(),
            createdBy: member.id,
          }),
        db
          .collection('members')
          .doc(member.id)
          .set({
            ...member,
            location: {
              latitude: member.location.y,
              longitude: member.location.x,
            },
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
    args: { transactionId: string },
    context: Context
  ) => {
    const session = context.executionContext.session()

    try {
      const transactionResponse = await session.executeRead((tx) =>
        tx.run(checkTransactionReference, args)
      )

      const transaction =
        transactionResponse.records[0]?.get('transaction').properties

      const { auth } = getStreamFinancials()

      const confirmPaymentBody: PayStackRequestBody = {
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
          if (error.response.data.status === false) {
            const promises = [
              session.executeWrite((tx) =>
                tx.run(setTransactionStatusFailed, args)
              ),
            ]

            const labels =
              transactionResponse.records[0]?.get('transaction').labels
            if (labels.includes('Offering')) {
              promises.push(
                db
                  .collection('offerings')
                  .doc(transaction.transactionReference)
                  .update({ status: 'failed' })
              )
            }
            if (labels.includes('Tithe')) {
              promises.push(
                db
                  .collection('tithes')
                  .doc(transaction.transactionReference)
                  .update({ status: 'failed' })
              )
            }
            if (labels.includes('BENMP')) {
              promises.push(
                db
                  .collection('benmp')
                  .doc(transaction.transactionReference)
                  .update({ status: 'failed' })
              )
            }

            await Promise.all(promises)
          }
          throw new Error(
            `There was an error confirming transaction - ${error.response.data.message}`
          )
        }
      )

      const labels = transactionResponse.records[0]?.get('transaction').labels
      const promises = [
        session.executeWrite((tx) =>
          tx.run(setTransactionStatusFailed, {
            transactionId: args.transactionId,
            transactionStatus: confirmationResponse.data.data.status,
          })
        ),
      ]

      if (labels.includes('Offering')) {
        promises.push(
          db
            .collection('offerings')
            .doc(transaction.transactionReference)
            .update({ status: confirmationResponse.data.data.status })
        )
      }
      if (labels.includes('Tithe')) {
        promises.push(
          db
            .collection('tithes')
            .doc(transaction.transactionReference)
            .update({ status: confirmationResponse.data.data.status })
        )
      }
      if (labels.includes('BENMP')) {
        promises.push(
          db
            .collection('benmp')
            .doc(transaction.transactionReference)
            .update({ status: confirmationResponse.data.data.status })
        )
      }

      const response = await Promise.all(promises)

      return response[0].records[0].get('labels').transaction.properties
    } catch (error: any) {
      console.error(error)
      throw new Error(`Payment Error: ${error.response?.data.message ?? error}`)
    } finally {
      session.close()
    }
  },
}

export const paymentQueries = {}
