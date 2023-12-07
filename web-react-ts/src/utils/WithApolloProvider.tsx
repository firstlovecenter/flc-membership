import { RetryLink } from '@apollo/client/link/retry'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client'
import { ReactNode, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { isTokenExpired } from '@jaedag/admin-portal-react-core'
import { useToast } from '@chakra-ui/react'

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 2000,
    jitter: true,
  },
  attempts: {
    max: 5,
  },
})

const WithApolloProvider = ({ children }: { children: ReactNode }) => {
  const { getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [expiryDate, setExpiryDate] = useState<string | null>(
    localStorage.getItem('expiryDate')
  )

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URI || '/graphql',
  })

  const authLink = setContext(async (_, { headers }) => {
    if (token && !isTokenExpired(expiryDate)) {
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      }
    }
    const fetchedToken = await getAccessTokenSilently({
      audience: 'https://flcadmin.netlify.app/graphql',
      scope: 'read:current_user',
      ignoreCache: true,
    })
    const fetchedExpiryDate = new Date(new Date().getTime() + 3600 * 1000)

    // Store token and its expiry date in local storage
    localStorage.setItem('token', fetchedToken)
    localStorage.setItem('expiryDate', fetchedExpiryDate.toString())

    // update state with new token and expiry
    setToken(fetchedToken)
    setExpiryDate(fetchedExpiryDate.toString())

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${fetchedToken}`,
      },
    }
  })

  const toast = useToast()
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (!toast.isActive(message))
          toast({
            id: message,
            title: 'GraphQL error',
            description: (
              <>
                <p>{`Message: ${message}`}</p>
                <p>{`Location: ${JSON.stringify(locations, null, 2)}`}</p>
                <p>{`Path: ${path}`}</p>
              </>
            ),
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
      })

    if (networkError)
      if (!toast.isActive(networkError?.message))
        toast({
          id: networkError?.message,
          title: 'Network error',
          description: (
            <>
              <p>{`Message: ${networkError?.message}`}</p>
              <p>{`Stack: ${networkError?.stack}`}</p>
            </>
          ),
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
  })

  const errorPolicy = 'all'
  const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URI || '/graphql',
    link: from([retryLink, errorLink, authLink.concat(httpLink)]),
    connectToDevTools: true,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy,
      },
      query: {
        errorPolicy,
      },
      mutate: {
        errorPolicy,
      },
    },
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default WithApolloProvider
