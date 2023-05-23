import { Role } from '@jaedag/admin-portal-api-core'
import { Session } from 'neo4j-driver'

export type Context = {
  auth: { roles: Role[]; jwt: { sub: string } }
  executionContext: { session: () => Session }
}
