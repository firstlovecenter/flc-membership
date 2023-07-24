import { gql } from '@apollo/client'

export const DISPLAY_MEMBER_BIO = gql`
  query displayMemberBio($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      middleName
      lastName
      fullName
      email
      phoneNumber
      whatsappNumber
      pictureUrl
      visitationArea
      pictureUrl
      dob {
        date
      }
      gender {
        gender
      }
      maritalStatus {
        status
      }
      occupation {
        occupation
      }
      title {
        name
      }
      fellowship {
        id
        bankingCode
      }
    }
  }
`

export const CREATE_MEMBER_PROFILE = gql`
  mutation createMemberProfile(
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $gender: String!
    $phoneNumber: String!
    $whatsappNumber: String!
    $email: String!
    $dob: String!
    $maritalStatus: String!
    $occupation: String!
    $pictureUrl: String!
    $visitationArea: String!
    $fellowshipCode: Int!
  ) {
    CreateMemberProfile(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      gender: $gender
      phoneNumber: $phoneNumber
      whatsappNumber: $whatsappNumber
      email: $email
      dob: $dob
      maritalStatus: $maritalStatus
      occupation: $occupation
      pictureUrl: $pictureUrl
      visitationArea: $visitationArea
      fellowshipCode: $fellowshipCode
    ) {
      id
      firstName
      middleName
      lastName
      fullName
      email
      phoneNumber
      whatsappNumber
      pictureUrl
      visitationArea
      pictureUrl
      dob {
        date
      }
      gender {
        gender
      }
      maritalStatus {
        status
      }
      fellowship {
        id
        name
        bankingCode
      }
    }
  }
`

export const GET_FELLOWSHIP = gql`
  query getFellowship($bankingCode: Int!) {
    fellowships(where: { bankingCode: $bankingCode }) {
      id
      name
      bankingCode
      leader {
        id
        firstName
        lastName
      }
    }
  }
`
