import { ReactNode, createContext, useContext } from 'react'
import { Member } from 'utils/global-types'
import { useAuth } from './AuthContext'
import { GET_MEMBER } from 'utils/Initialise.queries'
import { ApolloWrapper } from '@jaedag/admin-portal-core'
import { useQuery } from '@apollo/client'

interface UserContextType {
  user: Member
}

const UserContext = createContext<UserContextType>({
  user: {} as Member,
})

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()

  const { data, loading, error } = useQuery(GET_MEMBER, {
    variables: { email: currentUser.email },
  })

  const user = data?.members[0]

  const value = {
    user,
  }

  return (
    <UserContext.Provider value={value}>
      <ApolloWrapper data={data} loading={loading} error={error}>
        {children}
      </ApolloWrapper>
    </UserContext.Provider>
  )
}
