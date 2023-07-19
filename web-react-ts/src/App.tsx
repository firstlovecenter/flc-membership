import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from 'contexts/AuthContext'
import ProtectedRoute from 'auth/ProtectedRoute'
import { authRoutes } from 'auth/authRoutes'
import { LoadingPage, PageNotFound } from '@jaedag/admin-portal-react-core'
import { Suspense } from 'react'
import { offeringRoutes } from 'pages/give-offering/giveOfferingRoutes'
import AppWithApollo from 'utils/WithApolloProvider'
import { UserProvider } from 'contexts/UserContext'
import OfferingForm from 'pages/give-offering/OfferingForm'
import givingHistoryRoutes from 'pages/giving-history/givingHistoryRoutes'
import memberProfileRoutes from 'pages/member-profile/memberProfileRoutes'
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
                <Route
                  path="/give-offering/anonymous"
                  element={<OfferingForm />}
                />
                {[
                  ...authRoutes,
                  ...offeringRoutes,
                  ...givingHistoryRoutes,
                  ...memberProfileRoutes,
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
