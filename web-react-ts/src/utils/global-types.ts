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
