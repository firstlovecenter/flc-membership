import { useQuery } from '@apollo/client'
import {
  Button,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import {
  ApolloWrapper,
  getHumanReadableDateTime,
} from '@jaedag/admin-portal-react-core'
import { useUser } from 'contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { GET_TRANSACTION_DETAILS } from './giveOfferingQueries'

const OfferingDetails = () => {
  const { transactionId } = useUser()
  const { data, loading, error } = useQuery(GET_TRANSACTION_DETAILS, {
    variables: { transactionId },
  })
  const navigate = useNavigate()

  const transaction = data?.transactions[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container marginTop={10} centerContent>
        <Heading marginBottom={5}>Offering Details</Heading>

        <Table variant="striped" colorScheme="teal">
          <Tbody>
            <Tr>
              <Td>Transaction Time</Td>
              <Td>{getHumanReadableDateTime(transaction?.createdAt)}</Td>
            </Tr>
            <Tr>
              <Td>Amount</Td>
              <Td>{transaction?.amount}</Td>
            </Tr>
            <Tr>
              <Td>Method</Td>
              <Td>{transaction?.method}</Td>
            </Tr>
            <Tr>
              <Td>Statis</Td>
              <Td>{transaction?.transactionStatus}</Td>
            </Tr>
            <Tr>
              <Td>Reference</Td>
              <Td>{transaction?.transactionReference}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Button marginTop={5} onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    </ApolloWrapper>
  )
}

export default OfferingDetails
