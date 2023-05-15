import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import { AuthProvider } from 'contexts/AuthContext'
import PrivateRoute from 'auth/PrivateRoute'
import { authRoutes } from 'auth/authRoutes'
import { LoadingPage, PageNotFound } from '@jaedag/admin-portal-core'
import { Suspense } from 'react'
import { offeringRoutes } from 'pages/give-offering/giveOfferingRoutes'
import AppWithApollo from 'utils/AppWithApollo'
import { UserProvider } from 'contexts/UserContext'

const App = () => {
  return (
    <AuthProvider>
      <AppWithApollo>
        <UserProvider>
          <BrowserRouter>
            <Navigation />
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                {[...authRoutes, ...offeringRoutes].map((route, i) => (
                  <Route
                    key={i}
                    path={route.path}
                    element={
                      <PrivateRoute
                        roles={route.roles}
                        placeholder={route.placeholder}
                      >
                        <route.element />
                      </PrivateRoute>
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
