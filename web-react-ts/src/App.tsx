import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from 'contexts/AuthContext'
import ProtectedRoute from 'auth/ProtectedRoute'
import { authRoutes } from 'auth/authRoutes'
import { LoadingPage, PageNotFound } from '@jaedag/admin-portal-react-core'
import { Suspense } from 'react'
import { offeringRoutes } from 'pages/give-offering/giveOfferingRoutes'
import AppWithApollo from 'utils/WithApolloProvider'
import { UserProvider } from 'contexts/UserContext'
import givingHistoryRoutes from 'pages/giving-history/givingHistoryRoutes'
import memberProfileRoutes from 'pages/member-profile/memberProfileRoutes'
import locationRoutes from 'pages/update-location/updateLocationRoutes'
import Navigation from './components/Navigation'

const App = () => {
  return (
    <AuthProvider>
      <AppWithApollo>
        <UserProvider>
          <BrowserRouter>
            <Navigation />
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                {[
                  ...authRoutes,
                  ...offeringRoutes,
                  ...givingHistoryRoutes,
                  ...memberProfileRoutes,
                  ...locationRoutes,
                ].map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <ProtectedRoute
                        roles={route.roles}
                        placeholder={route.placeholder}
                      >
                        <route.element />
                      </ProtectedRoute>
                    }
                  />
                ))}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </UserProvider>
      </AppWithApollo>
    </AuthProvider>
  )
}

export default App
