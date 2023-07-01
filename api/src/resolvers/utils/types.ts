import { Member } from '@jaedag/admin-portal-types'

type transactionStatus = 'pending' | 'success' | 'failed'

export interface Transaction {
  id: string
  amount: number
  member: Member
  createdAt: Date
  updatedAt: Date
  createdBy: string
  transactionReference: string
  transactionStatus: transactionStatus
}
