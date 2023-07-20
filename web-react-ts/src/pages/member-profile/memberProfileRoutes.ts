import { lazy } from 'react'

const UpdateProfile = lazy(() => import('./UpdateProfile'))
const CreateProfile = lazy(() => import('./CreateProfile'))

export const memberProfileRoutes = [
  {
    path: '/update-profile',
    element: UpdateProfile,
    placeholder: false,
    roles: ['all'],
  },
  {
    path: '/create-profile',
    element: CreateProfile,
    placeholder: false,
    roles: ['all'],
  },
]

export default memberProfileRoutes
