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
      transactionReference
    }
  }
`

export const GET_TRANSACTION = gql`
  query getTransaction($transactionId: ID!) {
    transactions(where: { id: $transactionId }) {
      id
      transactionReference
    }
  }
`

export const CONFIRM_FELLOWSHIP_OFFERING_MOMO = gql`
  mutation confirmFellowshipOfferingMomo($transactionId: ID!) {
    ConfirmTransaction(transactionId: $transactionId) {
      id
      transactionReference
      transactionStatus
      income
    }
  }
`
