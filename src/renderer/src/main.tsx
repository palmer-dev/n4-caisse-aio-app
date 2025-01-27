import './assets/main.css'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@stores/store'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomeScreen from '@renderer/screens/HomeScreen'
import LayoutLoader from '@components/LayoutLoader/LayoutLoader'
import AuthRoute from '@components/RoutesProtections/AuthRoute'
import LoginScreen from '@renderer/screens/LoginScreen'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginScreen />} />
          <Route
            element={
              <Suspense fallback={<LayoutLoader />}>
                <AuthRoute />
              </Suspense>
            }
          >
            <Route path={'/dashboard'} element={<HomeScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
