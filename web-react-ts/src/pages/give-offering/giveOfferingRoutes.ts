import { lazy } from 'react'

const OfferingForm = lazy(() => import('./OfferingForm'))

export const offeringRoutes = [
  {
    path: '/give-offering',
    element: OfferingForm,
    placeholder: false,
    roles: ['all'],
  },
]

export default offeringRoutes
