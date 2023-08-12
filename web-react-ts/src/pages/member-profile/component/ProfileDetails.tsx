import { Text } from '@chakra-ui/react'
import React from 'react'

interface ProfileDetailsProps {
  title: string
  detail?: string
}

const ProfileDetails = ({ title, detail = '' }: ProfileDetailsProps) => (
  <>
    <Text fontWeight="bold">{title}</Text>
    <Text fontSize="lg">{detail}</Text>
  </>
)

ProfileDetails.defaultProps = {
  detail: '',
}

export default ProfileDetails
