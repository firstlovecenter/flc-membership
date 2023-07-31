import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { Badge, Container, Tag, TagLabel, Text } from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { GET_FELLOWSHIP } from '../pages/member-profile/memberProfileGQL'

const FellowshipCodeInputMessage = ({
  watchedFellowshipCode,
}: {
  watchedFellowshipCode: number
}) => {
  const [getFellowship, { data, loading, error }] = useLazyQuery(GET_FELLOWSHIP)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchedFellowshipCode) {
        getFellowship({
          variables: {
            bankingCode: parseInt(watchedFellowshipCode.toString(), 10),
          },
        })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [watchedFellowshipCode, getFellowship])

  const fellowship = data?.fellowships[0]

  return (
    <Container paddingY={2}>
      {!fellowship && !loading && (
        <Tag size="lg" colorScheme="red" borderRadius="full">
          <TagLabel>Fellowship Not Found</TagLabel>
        </Tag>
      )}

      {!!fellowship && (
        <>
          <Text as="span" color="green.100" fontWeight="bold">
            <Badge colorScheme="green" marginRight={2}>
              Fellowship
            </Badge>{' '}
            {fellowship.name}
          </Text>

          <Text color="green.100">
            <Badge colorScheme="green" marginRight={2}>
              Leader
            </Badge>
            {`${fellowship.leader.firstName} ${fellowship.leader.lastName}`}
          </Text>
        </>
      )}
      {loading && <BeatLoader color="grey" size={10} />}
      {error && <Text color="red.300">{error.message}</Text>}
    </Container>
  )
}

export default FellowshipCodeInputMessage
