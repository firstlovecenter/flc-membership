/* eslint-disable */
import { useAuth } from 'contexts/AuthContext'
import { PageNotFound } from '@jaedag/admin-portal-react-core'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  roles: string[]
  placeholder?: boolean
}
const defaultProps: Partial<ProtectedRouteProps> = {
  placeholder: false,
}

const PrivateRoute = (props: ProtectedRouteProps) => {
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

PrivateRoute.defaultProps = defaultProps

export default PrivateRoute
