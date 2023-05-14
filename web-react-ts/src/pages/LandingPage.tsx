import { Container, Text, Center } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError('Failed to log out')
    }
  }

  return (
    <Center height="60vh">
      <Container textAlign="center">
        <Card>
          <CardHeader>Profile</CardHeader>
          <CardBody>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Text>Name: {currentUser.displayName}</Text>

            <Text>Welcome David</Text>
            <Text>Choose an Option</Text>

            <VStack paddingY={10} spacing={4} align="stretch">
              <Button paddingY={10}>Pay Tithe</Button>
              <Button paddingY={10}>Give Offering</Button>
              <Button paddingY={10}>BENMP</Button>
              <Button paddingY={10}>Giving History</Button>
            </VStack>

            <Button marginTop={2} onClick={() => navigate('/update-profile')}>
              Update Profile
            </Button>
          </CardBody>
        </Card>
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </Container>
    </Center>
  )
}

export default LandingPage
