import {
  Button,
  Center,
  Container,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import ManualApprovalSteps from 'components/ManualApprovalSteps'
import { useUser } from 'contexts/UserContext'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import {
  CONFIRM_FELLOWSHIP_OFFERING_MOMO,
  GET_TRANSACTION_REFERENCE,
} from './giveOfferingQueries'

const ConfirmTransaction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { transactionId } = useUser()
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_TRANSACTION_REFERENCE, {
    variables: { transactionId },
  })
  const [confirmTransaction, { loading: btnLoading }] = useMutation(
    CONFIRM_FELLOWSHIP_OFFERING_MOMO
  )

  const [countdown, setCountdown] = useState(15)
  const transaction = data?.transactions[0]

  const togglePopup = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000)
  }, [countdown, setCountdown])

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Center height="80vh">
        <Container>
          <Spinner size="xl" />
          <Heading>Processing!</Heading>
          <Text marginTop="2">
            {`Your transaction of ${transaction?.amount} is currently being processed. Please wait for the
            prompt to authorize the transaction`}
          </Text>

          {countdown > 0 ? (
            <Button disabled marginY={4}>{`Confirm in ${countdown}`}</Button>
          ) : (
            <>
              <Button
                marginY={4}
                colorScheme="green"
                isLoading={btnLoading}
                onClick={async () => {
                  await confirmTransaction({
                    variables: { reference: transaction.transactionReference },
                  })
                  navigate('/offering-details')
                }}
              >
                Confirm Transaction
              </Button>{' '}
              <Text color="gray" onClick={() => togglePopup()}>
                <u>Prompt not received?</u>
              </Text>
            </>
          )}

          {isOpen && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ManualApprovalSteps close={togglePopup} />
              </ModalContent>
            </Modal>
          )}
        </Container>
      </Center>
    </ApolloWrapper>
  )
}

export default ConfirmTransaction
