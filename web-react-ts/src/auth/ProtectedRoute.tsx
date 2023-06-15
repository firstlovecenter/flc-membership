/* eslint-disable */
import { useAuth } from 'contexts/AuthContext'
import { PageNotFound } from '@jaedag/admin-portal-react-core'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: JSX.Element
  roles: string[]
  placeholder?: boolean
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
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

export default ProtectedRoute
