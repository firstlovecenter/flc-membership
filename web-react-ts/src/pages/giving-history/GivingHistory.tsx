import { useMutation, useQuery } from '@apollo/client'
import { useUser } from 'contexts/UserContext'
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Code,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react'
import { ApolloWrapper, CurrencySpan } from '@jaedag/admin-portal-react-core'
import { Member } from 'utils/global-types'
import { getHumanReadableDateTime } from '@jaedag/admin-portal-types'
import { FaCheckCircle } from 'react-icons/fa'
import { CONFIRM_BACENTA_OFFERING_MOMO } from 'pages/give-offering/giveOfferingQueries'
import { MEMBER_GIVING_HISTORY } from './givingHistoryGQL'

const GivingHistory = () => {
  const { user } = useUser()
  const toast = useToast()
  const { data, loading, error } = useQuery(MEMBER_GIVING_HISTORY, {
    variables: {
      memberId: user.id,
    },
  })

  const [ConfirmTransactionMutation, { loading: confirming }] = useMutation(
    CONFIRM_BACENTA_OFFERING_MOMO,
    {
      refetchQueries: [
        { query: MEMBER_GIVING_HISTORY, variables: { memberId: user.id } },
      ],
    }
  )

  const member: Member = data?.members[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Center>
        <Heading>Giving History</Heading>
      </Center>
      <Center>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
      </Center>
      <Container marginTop={10}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px">
          {member?.transactions.length > 0 &&
            member?.transactions.map((transaction) => {
              let badgeColour = 'red'
              if (transaction.transactionStatus === 'success') {
                badgeColour = 'green'
              } else if (transaction.transactionStatus === 'pending') {
                badgeColour = 'yellow'
              }

              return (
                <Card>
                  <CardHeader paddingY={2}>
                    <Heading size="sm">
                      {getHumanReadableDateTime(transaction.createdAt)}
                    </Heading>
                  </CardHeader>
                  <CardBody paddingY={2}>
                    <CurrencySpan number={transaction.amount} />
                    <Text>{`Method: ${transaction.method}`}</Text>
                    <Code>{transaction.transactionReference}</Code>
                    <Box>
                      <Badge colorScheme={badgeColour}>
                        {transaction.transactionStatus}
                      </Badge>
                    </Box>
                  </CardBody>
                  <CardFooter>
                    {['success', 'failed', 'abandoned'].includes(
                      transaction.transactionStatus
                    ) ? (
                      <Button colorScheme="blue" rightIcon={<FaCheckCircle />}>
                        Confirmed
                      </Button>
                    ) : (
                      <Button
                        colorScheme="yellow"
                        isLoading={confirming}
                        loadingText="Confirming..."
                        onClick={async () => {
                          try {
                            const res = await ConfirmTransactionMutation({
                              variables: {
                                reference: transaction.transactionReference,
                              },
                            })

                            if (res.errors) throw res.errors

                            toast({
                              title: 'Transaction Confirmed',
                              description: 'Transaction confirmed successfully',
                              status: 'success',
                              isClosable: true,
                            })
                          } catch (err) {
                            console.log(err)
                          }
                        }}
                      >
                        Confirm Transaction
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
        </SimpleGrid>
      </Container>
    </ApolloWrapper>
  )
}

export default GivingHistory
