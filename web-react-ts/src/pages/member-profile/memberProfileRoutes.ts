import { lazy } from 'react'

const UpdateProfile = lazy(() => import('./UpdateProfile'))

export const memberProfileRoutes = [
  {
    path: '/update-profile',
    element: UpdateProfile,
    placeholder: false,
    roles: ['all'],
  },
]

export default memberProfileRoutes
