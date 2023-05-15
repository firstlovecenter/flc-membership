import { Context } from './utils/neo-types'
import { Member } from './utils/types'

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
    giveOffering: async (
      source: unknown,
      args: { amount: number },
      context: Context
    ) => {},
  },
}

export default resolvers
