import { lazy } from 'react'
import { LazyRouteTypes } from './auth-types'

const Login = lazy(() => import('./LogIn'))
const LandingPage = lazy(() => import('../pages/LandingPage'))

export const authRoutes: LazyRouteTypes[] = [
  {
    path: '/login',
    element: Login,
    placeholder: true,
    roles: ['all'],
  },

  {
    path: '/',
    element: LandingPage,
    placeholder: false,
    roles: ['all'],
  },
]

export default authRoutes
