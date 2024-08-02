import { gql } from '@apollo/client'

export const GIVE_BACENTA_OFFERING_MOMO = gql`
  mutation GiveBacentaOfferingMomo(
    $memberEmail: String!
    $amount: Float!
    $mobileNetwork: String!
    $mobileNumber: String!
    $bankingCode: Int!
  ) {
    GiveBacentaOfferingMomo(
      memberEmail: $memberEmail
      amount: $amount
      mobileNetwork: $mobileNetwork
      mobileNumber: $mobileNumber
      bankingCode: $bankingCode
    ) {
      id
      amount
      transactionReference
      transactionStatus
    }
  }
`

export const GET_TRANSACTION_REFERENCE = gql`
  query getTransactionReference($transactionId: ID!) {
    transactions(where: { id: $transactionId }) {
      id
      amount
      transactionReference
      transactionStatus
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

export const CONFIRM_BACENTA_OFFERING_MOMO = gql`
  mutation ConfirmBacentaOfferingMomo($reference: String!) {
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

export const SEND_TRANSACTION_OTP = gql`
  mutation SendTransactionOTP($reference: String!, $otp: String!) {
    SendTransactionOTP(reference: $reference, otp: $otp) {
      id
      transactionReference
      transactionStatus
      amount
      method
      createdAt
    }
  }
`
