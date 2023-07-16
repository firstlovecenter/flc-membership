import { Box, Button, Center, Container, Heading, Text } from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'

const LogIn = () => {
  const { login, setCurrentUser } = useAuth()

  const anonymousUser = {
    id: 'anonymous',
    name: 'anonymous',
    firstName: 'Anonymous',
    lastName: '',
    fellowship: {
      bankingCode: '0000',
    },
    email: 'anon@anonymous.com',
  }

  return (
    <Container>
      <Center height="80vh">
        <Container>
          <Heading size="md" textAlign="center" marginBottom={4} paddingX={10}>
            Welcome to the First Love Members Portal
          </Heading>

          <Box marginY={2} height="200px" />
          <Box textAlign="center">
            <Text size="sm">Give all your offerings...</Text>
            <Text size="sm">Pay all your tithes</Text>
            <Text size="sm">Come and give it</Text>
          </Box>

          <Button
            width="100%"
            type="submit"
            size="lg"
            colorScheme="teal"
            marginTop={5}
            onClick={login}
          >
            Login
          </Button>
          <Button
            width="100%"
            type="submit"
            size="lg"
            marginTop={5}
            onClick={() => setCurrentUser(anonymousUser)}
          >
            Anonymous
          </Button>
        </Container>
      </Center>
    </Container>
  )
}

export default LogIn
