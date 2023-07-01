import { lazy } from 'react'

const GivingHistory = lazy(() => import('./GivingHistory'))

export const givingHistoryRoutes = [
  {
    path: '/giving-history',
    element: GivingHistory,
    placeholder: false,
    roles: ['all'],
  },
]

export default givingHistoryRoutes
