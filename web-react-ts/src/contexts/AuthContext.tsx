import { User, useAuth0 } from '@auth0/auth0-react'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface AuthContextType {
  currentUser: User
  setCurrentUser: (user: User) => void
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  currentUser: {} as User,
  setCurrentUser: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const {
    loginWithRedirect,
    logout: logoutAuth0,
    user,
    isAuthenticated,
  } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentUser(user as User)
    }
  }, [user, isAuthenticated])

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      login: () => {
        return loginWithRedirect()
      },
      logout: () => {
        setCurrentUser({} as User)
        return logoutAuth0()
      },
    }),
    [currentUser, loginWithRedirect, logoutAuth0]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
