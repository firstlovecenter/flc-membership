import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Heading,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { Input } from '@jaedag/admin-portal-core'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const LogIn = () => {
  const [error, setError] = useState('')
  const { login, currentUser } = useAuth()
  const navigate = useNavigate()

  return (
    <Container>
      <Center height="80vh">
        <Container>
          <Card>
            <CardBody>
              <Heading textAlign="center" marginBottom={4}>
                Log In
              </Heading>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Text>{JSON.stringify(currentUser?.email)}</Text>

              <Button
                width="100%"
                type="submit"
                size="lg"
                marginTop={5}
                onClick={login}
              >
                Log In
              </Button>

              <Container marginTop={3}>
                <Text
                  textAlign="center"
                  color="blue.500"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </Text>
              </Container>
            </CardBody>
          </Card>
          <Center width="100%" marginTop={2}>
            <Text>
              Need an account?{' '}
              <Link as={RouterLink} to="/signup">
                Sign Up
              </Link>
            </Text>
          </Center>
        </Container>
      </Center>
    </Container>
  )
}

export default LogIn
