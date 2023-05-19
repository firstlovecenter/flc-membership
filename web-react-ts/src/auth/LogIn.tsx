import { Box, Button, Center, Container, Heading, Text } from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'

const LogIn = () => {
  const { login } = useAuth()

  return (
    <Container>
      <Center height="80vh">
        <Container>
          <Heading size="md" textAlign="center" marginBottom={4} paddingX={10}>
            Welcome to the First Love Members Giving Portal
          </Heading>

          <Box marginY={2} height="200px" />
          <Box textAlign="center">
            <Text>Give all your offerings...</Text>
            <Text>Pay all your tithes</Text>
            <Text>Come and give it</Text>
          </Box>

          <Button
            width="100%"
            type="submit"
            size="lg"
            marginTop={5}
            onClick={login}
          >
            Login as a member
          </Button>
        </Container>
      </Center>
    </Container>
  )
}

export default LogIn
