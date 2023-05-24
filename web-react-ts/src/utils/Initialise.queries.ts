import { gql } from '@apollo/client'

export const GET_MEMBER = gql`
  query getMember($email: String!) {
    members(where: { email: $email }) {
      id
      firstName
      lastName
      fullName
      email
      phoneNumber
      whatsappNumber
      pictureUrl
      fellowship {
        id
        name
        bankingCode
      }
    }
  }
`

export default GET_MEMBER
