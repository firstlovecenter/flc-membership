import { useUser } from 'contexts/UserContext'
import React from 'react'
import { ApolloWrapper, EditButton } from '@jaedag/admin-portal-react-core'
import {
  Center,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { Member } from '@jaedag/admin-portal-types'
import useCustomColors from 'hooks/useCustomColors'
import { useNavigate } from 'react-router-dom'
import { DISPLAY_MEMBER_BIO } from './memberProfileGQL'
import ProfileDetails from './component/ProfileDetails'

interface MemberWithCouncil extends Member {
  council: {
    id: string
    name: string
  }
}

const ProfileDisplay = () => {
  const { user } = useUser()
  const { brand } = useCustomColors()
  const navigate = useNavigate()

  const { data, error, loading } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: user.id },
  })

  const member = data?.members[0] as MemberWithCouncil | undefined
  const calculateAge = (dob: string | undefined) => {
    if (!dob) return 0

    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1
    }

    return age
  }

  const getDate = (date: string | undefined) => {
    if (!date) return ''

    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <ApolloWrapper data={member} loading={loading} error={error}>
      <Container paddingBottom={20} paddingTop={10}>
        <Heading>Profile Information</Heading>
        <Heading size="md" color={brand}>
          {member?.firstName} {member?.lastName}
        </Heading>
        <HStack paddingY={2}>
          <Heading size="sm">{`${member?.council.name} Council`}</Heading>
          <EditButton onClick={() => navigate('/update-profile')} />
        </HStack>

        <Container width="350px" height="350px" marginBottom={4}>
          <Center height="100%">
            <Image
              src={member?.pictureUrl}
              fallbackSrc="https://res.cloudinary.com/firstlovecenter/image/upload/v1683818433/placeholder350_tt6roc.png"
              rounded="md"
            />
          </Center>
          heaH E
        </Container>

        <Center>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <ProfileDetails title="First Name" detail={member?.firstName} />
            </GridItem>
            <GridItem>
              <ProfileDetails title="Middle Name" detail={member?.middleName} />
            </GridItem>
            <GridItem colSpan={2}>
              <ProfileDetails title="Last Name" detail={member?.lastName} />
            </GridItem>
            <GridItem colSpan={2}>
              <ProfileDetails title="Email" detail={member?.email} />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Phone Number"
                detail={member?.phoneNumber}
              />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Whatsapp Number"
                detail={member?.whatsappNumber}
              />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Age"
                detail={`${calculateAge(member?.dob.date)} Years`}
              />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Birthday"
                detail={`${getDate(member?.dob.date)}`}
              />
            </GridItem>
            <GridItem>
              <ProfileDetails title="Gender" detail={member?.gender.gender} />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Marital Status"
                detail={member?.maritalStatus.maritalStatus}
              />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Residential Address"
                detail={member?.visitationArea}
              />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Occupation"
                detail={member?.occupation.occupation}
              />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Fellowship"
                detail={`${member?.fellowship.name} Fellowship`}
              />
            </GridItem>
            <GridItem>
              <ProfileDetails
                title="Fellowship Leader"
                detail={`${member?.fellowship.leader.firstName} ${member?.fellowship.leader.lastName}`}
              />
            </GridItem>
          </Grid>
        </Center>
      </Container>
    </ApolloWrapper>
  )
}

export default ProfileDisplay
