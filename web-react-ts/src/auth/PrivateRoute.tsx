import { useAuth } from 'contexts/AuthContext'
import { PageNotFound } from '@jaedag/admin-portal-react-core'
import LogIn from './LogIn'

interface ProtectedRouteProps {
  children: JSX.Element
  roles: string[]
  placeholder?: boolean
}

const PrivateRoute: (props: ProtectedRouteProps) => JSX.Element = (props) => {
  const { children, roles, placeholder } = props
  const { currentUser } = useAuth()

  if (placeholder) {
    return children
  }

  if (roles.includes('all')) {
    return children
  }

  if (!currentUser) {
    return <PageNotFound />
  }
}

export default PrivateRoute
