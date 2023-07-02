import { gql } from '@apollo/client'

export const MEMBER_GIVING_HISTORY = gql`
  query memberGivingHistory($memberId: ID!) {
    members(where: { id: $memberId }) {
      id
      firstName
      lastName
      transactions {
        id
        amount
        method
        createdAt
        transactionStatus
        transactionReference
      }
    }
  }
`

export default MEMBER_GIVING_HISTORY
