import { Text } from '@chakra-ui/react'
import React from 'react'

const ProfileDetails = ({
  title,
  detail,
}: {
  title: string
  detail: string
}) => (
  <>
    <Text fontWeight="bold">{title}</Text>
    <Text fontSize="lg">{detail}</Text>
  </>
)

export default ProfileDetails
