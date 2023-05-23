import {
  Member,
  Network,
  Stream,
  paystackAxiosReq,
} from '@jaedag/admin-portal-api-core'
import axios from 'axios'
import { Context } from '../utils/neo-types'
import { getMember, initiatePaymentTransaction } from './cypher'
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
          tx.run(initiatePaymentTransaction, {
            ...args,
            auth: context.auth,
            reference: paymentRes.reference,
            status: paymentRes.status,
          })
        ),
        db.collection('transactions').add({
          ...args,
          reference: paymentRes.reference,
          status: paymentRes.status,
          createdAt: new Date(),
          createdBy: context.auth.jwt.sub,
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
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
}

export const paymentQueries = {}
