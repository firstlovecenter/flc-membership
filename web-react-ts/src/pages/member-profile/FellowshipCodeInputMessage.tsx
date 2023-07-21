import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { Container, Text } from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { GET_FELLOWSHIP } from './memberProfileGQL'

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
        <Text color="gray">Fellowship Not Found</Text>
      )}

      {!!fellowship && (
        <>
          <Text color="green.100" fontWeight="bold">
            {`Fellowship: ${fellowship.name}`}
          </Text>
          <Text color="green.100">{`Leader: ${fellowship.leader.firstName} ${fellowship.leader.lastName}`}</Text>
        </>
      )}
      {loading && <BeatLoader color="grey" size={10} />}
      {error && <Text color="red.300">{error.message}</Text>}
    </Container>
  )
}

export default FellowshipCodeInputMessage
