import { gql } from '@apollo/client'

export const GIVE_FELLOWSHIP_OFFERING_MOMO = gql`
  mutation giveFellowshipOfferingMomo(
    $amount: Float!
    $mobileNetwork: String!
    $mobileNumber: String!
    $bankingCode: Int!
  ) {
    giveFellowshipOfferingMomo(
      amount: $amount
      mobileNetwork: $mobileNetwork
      mobileNumber: $mobileNumber
      bankingCode: $bankingCode
    ) {
      id
      reference
    }
  }
`

export const CONFIRM_FELLOWSHIP_OFFERING_MOMO = ``
