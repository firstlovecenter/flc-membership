import { RetryLink } from '@apollo/client/link/retry'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client'
import { ReactNode, useContext, useEffect } from 'react'
import { useAuth } from 'contexts/AuthContext'
import LogIn from 'auth/LogIn'

const AppWithApollo = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()

  const getFirebaseToken = async () => {
    if (!currentUser) {
      return <LogIn />
    }

    const token = await currentUser.getIdToken()

    sessionStorage.setItem('token', token)
  }

  useEffect(() => {
    getFirebaseToken()
  }, [])

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URI || '/graphql',
  })
  const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem('token')

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
