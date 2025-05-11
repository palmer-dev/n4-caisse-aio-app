import './assets/main.css'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@stores/store.ts'
import { HashRouter, Route, Routes } from 'react-router'
import HomeScreen from '@renderer/screens/HomeScreen.tsx'
import LayoutLoader from '@components/LayoutLoader/LayoutLoader.tsx'
import AuthRoute from '@components/RoutesProtections/AuthRoute.tsx'
import LoginScreen from '@renderer/screens/LoginScreen.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
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
      </HashRouter>
    </Provider>
  </React.StrictMode>
)
