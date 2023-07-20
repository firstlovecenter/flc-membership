import {
  Container,
  Text,
  Center,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'contexts/UserContext'
import { FaExclamationTriangle } from 'react-icons/fa'

const NoAccountLandingPage = () => {
  const [error, setError] = useState('')
  const { logout } = useAuth()
  const { user } = useUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch (err) {
      setError('Failed to log out')
    }
  }

  return (
    <Center paddingTop={10}>
      <Container textAlign="center">
        <Card variant="outline">
          <CardHeader>
            <Avatar
              size="xl"
              src={user?.picture}
              name={`${user.given_name} ${user.family_name}`}
            />
            <Text>Welcome {user.given_name}</Text>
          </CardHeader>
          <CardBody>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <VStack paddingY={10} spacing={4} align="stretch">
              <Text>
                {`You'll need to update your profile so that you can access your
                membership portal`}
              </Text>
              <Button
                paddingY={10}
                marginTop={2}
                colorScheme="red"
                leftIcon={<FaExclamationTriangle />}
                onClick={() => navigate('/create-profile')}
              >
                Update Profile
              </Button>
            </VStack>
          </CardBody>
          <Button variant="link" paddingBottom={10} onClick={handleLogout}>
            Log Out
          </Button>
        </Card>
      </Container>
    </Center>
  )
}
export default NoAccountLandingPage
