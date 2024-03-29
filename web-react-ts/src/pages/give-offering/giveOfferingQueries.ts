import { gql } from '@apollo/client'

export const GIVE_FELLOWSHIP_OFFERING_MOMO = gql`
  mutation GiveFellowshipOfferingMomo(
    $memberEmail: String!
    $amount: Float!
    $mobileNetwork: String!
    $mobileNumber: String!
    $bankingCode: Int!
  ) {
    GiveFellowshipOfferingMomo(
      memberEmail: $memberEmail
      amount: $amount
      mobileNetwork: $mobileNetwork
      mobileNumber: $mobileNumber
      bankingCode: $bankingCode
    ) {
      id
      amount
      transactionReference
    }
  }
`

export const GET_TRANSACTION_REFERENCE = gql`
  query getTransactionReference($transactionId: ID!) {
    transactions(where: { id: $transactionId }) {
      id
      amount
      transactionReference
    }
  }
`

export const GET_TRANSACTION_DETAILS = gql`
  query getTransactionDetails($transactionId: ID!) {
    transactions(where: { id: $transactionId }) {
      id
      amount
      method
      createdAt
      transactionStatus
      transactionReference
    }
  }
`

export const CONFIRM_FELLOWSHIP_OFFERING_MOMO = gql`
  mutation ConfirmFellowshipOfferingMomo($reference: String!) {
    ConfirmTransaction(reference: $reference) {
      id
      transactionReference
      transactionStatus
      amount
      method
      createdAt
    }
  }
`
