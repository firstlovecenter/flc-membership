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
export const GIVE_ANON_FELLOWSHIP_OFFERING_MOMO = gql`
  mutation giveAnonFellowshipOfferingMomo(
    $amount: Float!
    $mobileNetwork: String!
    $mobileNumber: String!
    $bankingCode: Int!
  ) {
    giveAnonFellowshipOfferingMomo(
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
  mutation confirmFellowshipOfferingMomo($reference: String!) {
    confirmTransaction(reference: $reference) {
      id
      transactionReference
      transactionStatus
      amount
      method
      createdAt
    }
  }
`
