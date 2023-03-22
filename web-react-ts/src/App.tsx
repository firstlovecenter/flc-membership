import './App.css'
import { Button, Card, Container, Text, VStack } from '@chakra-ui/react'

const App = () => {
  return (
    <Container height="100vh" width="100%">
      <Text>Welcome David</Text>
      <Text>Choose an Option</Text>

      <VStack paddingY={10} spacing={4} align="stretch">
        <Button paddingY={10}>Pay Tithe</Button>
        <Button paddingY={10}>Give Offering</Button>
        <Button paddingY={10}>BENMP</Button>
        <Button paddingY={10}>Giving History</Button>
      </VStack>
    </Container>
  )
}

export default App
