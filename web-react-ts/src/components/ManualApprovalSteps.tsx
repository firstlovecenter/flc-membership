import { Button, Heading, ListItem, UnorderedList } from '@chakra-ui/react'

type ManualApprovalStepsProps = {
  close: () => void
}

const ManualApprovalSteps = (props: ManualApprovalStepsProps) => {
  const { close } = props
  return (
    <>
      <Heading>Manual Approval</Heading>
      To manually approve the transaction
      <UnorderedList className="mt-3 force-left">
        <ListItem className="text-left">Dial *170#</ListItem>
        <ListItem>Choose Option: 6) Wallet</ListItem>
        <ListItem>{`Choose Option: 3) My Approvals `}</ListItem>
        <ListItem>
          Enter your MoMo Pin to retrieve your pending approval list
        </ListItem>
        <ListItem>Choose a pending transaction</ListItem>
        <ListItem>Choose Option 1 to approve</ListItem>
        <ListItem>Tap button to continue</ListItem>
      </UnorderedList>
      <Button onClick={close} colorScheme="green" size="lg">
        Okay!
      </Button>
    </>
  )
}

export default ManualApprovalSteps
