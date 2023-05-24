import { lazy } from 'react'

const OfferingForm = lazy(() => import('./OfferingForm'))
const ConfirmTransaction = lazy(() => import('./ConfirmTransaction'))

export const offeringRoutes = [
  {
    path: '/give-offering',
    element: OfferingForm,
    placeholder: false,
    roles: ['all'],
  },
  {
    path: '/confirm-transaction',
    element: ConfirmTransaction,
    placeholder: false,
    roles: ['all'],
  },
]

export default offeringRoutes
