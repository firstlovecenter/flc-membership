import { lazy } from 'react'

const OfferingForm = lazy(() => import('./OfferingForm'))
const confirmTransaction = lazy(() => import('./confirmTransaction'))
const OfferingDetails = lazy(() => import('./OfferingDetails'))

export const offeringRoutes = [
  {
    path: '/give-offering',
    element: OfferingForm,
    placeholder: false,
    roles: ['all'],
  },
  {
    path: '/confirm-transaction',
    element: confirmTransaction,
    placeholder: false,
    roles: ['all'],
  },
  {
    path: '/offering-details',
    element: OfferingDetails,
    placeholder: false,
    roles: ['all'],
  },
]

export default offeringRoutes
