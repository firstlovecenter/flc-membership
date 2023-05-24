import { ReactNode, createContext, useContext, useState } from 'react'
import { GET_MEMBER } from 'utils/Initialise.queries'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useQuery } from '@apollo/client'
import { Member } from 'utils/global-types'
import { useAuth } from './AuthContext'

interface UserContextType {
  user: Member
  transactionId: string
  setTransactionId: (transactionId: string) => void
}

const UserContext = createContext<UserContextType>({
  user: {} as Member,
  transactionId: '',
  setTransactionId: () => null,
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
  const [transactionId, setTransactionId] = useState<string>('')

  const { data, loading, error } = useQuery(GET_MEMBER, {
    variables: { email: currentUser?.email ?? 'no@email.com' },
  })

  const user = data?.members[0]

  const value = {
    user,
    transactionId,
    setTransactionId,
  }

  return (
    <UserContext.Provider value={value}>
      <ApolloWrapper data={data && user} loading={loading} error={error}>
        {children}
      </ApolloWrapper>
    </UserContext.Provider>
  )
}
