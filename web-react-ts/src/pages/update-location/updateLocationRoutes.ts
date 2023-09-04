import { lazy } from 'react'

const UpdateLocation = lazy(() => import('./UpdateLocation'))

export const locationRoutes = [
  {
    path: '/update-location',
    element: UpdateLocation,
    placeholder: false,
    roles: ['all'],
  },
]

export default locationRoutes
