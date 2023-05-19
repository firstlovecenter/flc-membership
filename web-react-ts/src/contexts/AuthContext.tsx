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
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  currentUser: {} as User,
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

  const login = () => {
    return loginWithRedirect()
  }

  const logout = () => {
    return logoutAuth0()
  }

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentUser(user as User)
    }
  }, [user, isAuthenticated])

  const value = {
    currentUser,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
