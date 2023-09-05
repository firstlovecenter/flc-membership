import { gql } from '@apollo/client'

export const UPDATE_HOME_LOCATION_MUTATION = gql`
  mutation UpdateHomeLocationInput(
    $memberId: ID!
    $latitude: Float!
    $longitude: Float!
  ) {
    updateMemberHomeLocation(
      memberId: $memberId
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      homeVisitationLocation {
        longitude
        latitude
      }
      visitationArea
    }
  }
`

export const UPDATE_WORK_OR_SCHOOL_LOCATION_MUTATION = gql`
  mutation UpdateWorkOrSchoolLocationInput(
    $memberId: ID!
    $latitude: Float!
    $longitude: Float!
  ) {
    updateMemberWorkOrSchoolLocation(
      memberId: $memberId
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      workOrSchoolVisitationLocation {
        longitude
        latitude
      }
      visitationArea
    }
  }
`

export const UPDATE_PREFERRED_LOCATIION_MUTATION = gql`
  mutation UpdatePreferredLocationInput(
    $memberId: ID!
    $latitude: Float!
    $longitude: Float!
    $visitationArea: String!
  ) {
    updateMemberPreferredLocation(
      memberId: $memberId
      latitude: $latitude
      longitude: $longitude
      visitationArea: $visitationArea
    ) {
      id
      location {
        longitude
        latitude
      }
      visitationArea
    }
  }
`
