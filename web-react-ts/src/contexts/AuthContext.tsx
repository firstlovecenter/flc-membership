import { User, useAuth0 } from '@auth0/auth0-react'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextType {
  currentUser: User
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  currentUser: {} as User,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
})

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)
  const {
    loginWithRedirect,
    logout: logoutAuth0,
    user,
    isAuthenticated,
  } = useAuth0()

  const login = () => {
    return loginWithRedirect()
  }

  const logout = () => {
    return logoutAuth0()
  }

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentUser(user as User)
      setLoading(false)
    }
  }, [user, isAuthenticated])

  const value = {
    currentUser,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
