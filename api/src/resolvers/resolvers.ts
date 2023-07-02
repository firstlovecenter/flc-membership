/* eslint-disable no-underscore-dangle */
import { Member } from '@jaedag/admin-portal-types'
import { paymentMutations } from './payment/payment-resolvers'
import { db } from './firebase-init'
import { convertFirestoreTimestampToDate } from './utils/utils'
import { Transaction } from './utils/types'

const dotenv = require('dotenv')

dotenv.config()

const resolvers = {
  // Resolver Parameters
  // Object: the parent result of a previous resolver
  // Args: Field Arguments
  // Context: Context object, database connection, API, etc
  // GraphQLResolveInfo

  Member: {
    fullName: (source: Member) => `${source.firstName} ${source.lastName}`,
    transactions: async (source: Member) => {
      const collections = ['offerings']

      const fetchData = async () => {
        const data = await Promise.all(
          collections.map(async (collection) => {
            const snapshot = await db
              .collection(collection)
              .where('createdBy', '==', source.id)
              .get()

            return snapshot.docs.map((doc: { data: () => any }) => doc.data())
          })
        )

        return data.flat()
      }

      const transactions = await fetchData()

      return transactions
    },
  },
  Transaction: {},
  Offering: {
    __isTypeOf() {
      return 'Transaction'
    },
    id: (source: Transaction) => source.transactionReference,
    createdAt: (source: Transaction) =>
      convertFirestoreTimestampToDate(source.createdAt),
    updatedAt: (source: Transaction) =>
      convertFirestoreTimestampToDate(source.updatedAt),
  },
  Mutation: {
    ...paymentMutations,
  },
}

export default resolvers
