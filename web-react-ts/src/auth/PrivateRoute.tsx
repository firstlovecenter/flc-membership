import { useAuth } from 'contexts/AuthContext'
import { PageNotFound } from '@jaedag/admin-portal-react-core'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
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

  return <PageNotFound />
}

export default PrivateRoute
