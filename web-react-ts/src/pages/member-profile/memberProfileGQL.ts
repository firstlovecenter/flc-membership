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
      council {
        id
        name
      }
      bacenta {
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
  }
`

export const CREATE_MEMBER_PROFILE = gql`
  mutation CreateMemberProfile(
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
    $bacentaCode: Int!
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
      bacentaCode: $bacentaCode
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
      bacenta {
        id
        name
        bankingCode
      }
    }
  }
`

export const GET_BACENTA = gql`
  query getBacenta($bankingCode: Int!) {
    bacentas(where: { bankingCode: $bankingCode }) {
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
