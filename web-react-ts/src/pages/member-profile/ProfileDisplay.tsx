import { useUser } from 'contexts/UserContext'
import React from 'react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { Center, Container, Heading, Image } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { Member } from '@jaedag/admin-portal-types'
import useCustomColors from 'hooks/useCustomColors'
import { DISPLAY_MEMBER_BIO } from './memberProfileGQL'
import ProfileDetails from './component/ProfileDetails'

const ProfileDisplay = () => {
  const { user } = useUser()
  const { brand } = useCustomColors()

  const { data, error, loading } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: user.id },
  })

  const member: Member = data?.members[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container paddingBottom={20} paddingTop={10}>
        <Heading>Profile Information</Heading>
        <Heading size="md" color={brand}>
          {member.firstName} {member.lastName}
        </Heading>
        <Container padding={0} width="350px" height="350px" marginBottom={4}>
          <Center height="100%">
            <Image
              src={member?.pictureUrl}
              fallbackSrc="https://res.cloudinary.com/firstlovecenter/image/upload/v1683818433/placeholder350_tt6roc.png"
              rounded="md"
            />
          </Center>
        </Container>

        <ProfileDetails title="First Name" detail={member.firstName} />
        <ProfileDetails title="Middle Name" detail={member.middleName} />
        <ProfileDetails title="Last Name" detail={member.lastName} />
      </Container>
    </ApolloWrapper>
  )
}

export default ProfileDisplay
