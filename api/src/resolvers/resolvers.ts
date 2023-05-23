import { Member } from '@jaedag/admin-portal-api-core'
import { paymentMutations } from './payment/resolvers'

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
  },
  Mutation: {
    ...paymentMutations,
  },
}

export default resolvers
