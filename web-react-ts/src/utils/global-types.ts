export interface Member {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phoneNumber: string
  whatsappNumber: string
  pictureUrl: string
  fellowship: {
    id: string
    name: string
    bankingCode: number
  }
}

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
