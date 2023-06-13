import {
  Button,
  Container,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

type ManualApprovalStepsProps = {
  close: () => void
}

const ManualApprovalSteps = (props: ManualApprovalStepsProps) => {
  const { close } = props
  return (
    <Container>
      <Heading>Manual Approval</Heading>
      <Text>To manually approve the transaction</Text>
      <UnorderedList marginY={2}>
        <ListItem>Dial *170#</ListItem>
        <ListItem>{`Choose Option: 6) Wallet `}</ListItem>
        <ListItem>{`Choose Option: 3) My Approvals `}</ListItem>
        <ListItem>
          Enter your MoMo Pin to retrieve your pending approval list
        </ListItem>
        <ListItem>Choose a pending transaction</ListItem>
        <ListItem>Choose Option 1 to approve</ListItem>
        <ListItem>Tap button to continue</ListItem>
      </UnorderedList>
      <Button onClick={close} colorScheme="green" marginY={4}>
        Okay!
      </Button>
    </Container>
  )
}

export default ManualApprovalSteps
