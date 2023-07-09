import { useQuery } from '@apollo/client'
import { useUser } from 'contexts/UserContext'
import { Center, Heading, Text } from '@chakra-ui/react'
import {
  ApolloWrapper,
  CurrencySpan,
  TableFromArrays,
} from '@jaedag/admin-portal-react-core'
import { Member } from 'utils/global-types'
import { getHumanReadableDateTime } from '@jaedag/admin-portal-types'
import { MEMBER_GIVING_HISTORY } from './givingHistoryGQL'

const GivingHistory = () => {
  const { user } = useUser()
  const { data, loading, error } = useQuery(MEMBER_GIVING_HISTORY, {
    variables: {
      memberId: user.id,
    },
  })

  const member: Member = data?.members[0]

  const headings = [['Date', 'Amount', 'Method', 'Status', 'Reference']]
  const tableArray = member?.transactions.map((transaction) => {
    return [
      getHumanReadableDateTime(transaction.createdAt),
      <CurrencySpan number={transaction.amount} />,
      transaction.method,
      transaction.transactionStatus,
      transaction.transactionReference,
    ]
  })

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
      <TableFromArrays
        heading={headings}
        loading={loading}
        tableArray={tableArray as unknown as string[][]}
      />
    </ApolloWrapper>
  )
}

export default GivingHistory
