import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { Badge, Container, Tag, TagLabel, Text } from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { GET_BACENTA } from '../pages/member-profile/memberProfileGQL'

const BacentaCodeInputMessage = ({
  watchedBacentaCode,
}: {
  watchedBacentaCode: number
}) => {
  const [getBacenta, { data, loading, error }] = useLazyQuery(GET_BACENTA)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchedBacentaCode) {
        getBacenta({
          variables: {
            bankingCode: parseInt(watchedBacentaCode.toString(), 10),
          },
        })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [watchedBacentaCode, getBacenta])

  const bacenta = data?.bacentas[0]

  return (
    <Container paddingY={2}>
      {!bacenta && !loading && (
        <Tag size="lg" colorScheme="red" borderRadius="full">
          <TagLabel>Bacenta Not Found</TagLabel>
        </Tag>
      )}

      {!!bacenta && (
        <>
          <Text as="span" color="green.100" fontWeight="bold">
            <Badge colorScheme="green" marginRight={2}>
              Bacenta
            </Badge>{' '}
            {bacenta.name}
          </Text>

          <Text color="green.100">
            <Badge colorScheme="green" marginRight={2}>
              Leader
            </Badge>
            {`${bacenta.leader.firstName} ${bacenta.leader.lastName}`}
          </Text>
        </>
      )}
      {loading && <BeatLoader color="grey" size={10} />}
      {error && <Text color="red.300">{error.message}</Text>}
    </Container>
  )
}

export default BacentaCodeInputMessage
