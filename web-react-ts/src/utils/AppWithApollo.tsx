import { RetryLink } from '@apollo/client/link/retry'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const AppWithApollo = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>('')
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://flcadmin.netlify.app/graphql',
        scope: 'read:current_user',
      })

      setAccessToken(token)
      sessionStorage.setItem('token', token)
    } catch (err) {
      // eslint-disable-next-line
      console.error('Error Obtaining Token', err)
    }
  }, [getAccessTokenSilently])

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken()
    }
  }, [getAccessToken, isAuthenticated])

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URI || '/graphql',
  })
  const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem('token') || accessToken

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
  })

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

  const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URI || '/graphql',
    link: from([retryLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AppWithApollo
