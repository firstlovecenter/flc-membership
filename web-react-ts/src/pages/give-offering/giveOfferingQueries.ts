import { gql } from '@apollo/client'

export const GIVE_FELLOWSHIP_OFFERING = gql`
  mutation giveFellowshipOffering($memberId: ID!, $amount: Float!) {
    giveFellowshipOffering(memberId: $memberId, amount: $amount) {
      id
      transactionReference
    }
  }
`
