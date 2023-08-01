import { lazy } from 'react'

const UpdateProfile = lazy(() => import('./ProfileUpdate'))
const CreateProfile = lazy(() => import('./ProfileCreate'))
const DisplayProfile = lazy(() => import('./ProfileDisplay'))

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
  {
    path: '/display-profile',
    element: DisplayProfile,
    placeholder: false,
    roles: ['all'],
  },
]

export default memberProfileRoutes
