import { Navigate, Outlet } from 'react-router'
import { selectAuth } from '@services/auth/authSlice.ts'
import { useEffect } from 'react'
import { open } from '@services/modal/modalSlice.ts'
import AuthModal from '@components/AuthModal/AuthModal.tsx'
import Menu from '@components/Menu/Menu.js'
import { useAppDispatch, useAppSelector } from '@stores/hook.js'
import { useLoginMutation } from '@services/auth/authExtendedApi.js'
import { logoutApp, userLogin } from '@services/auth/thunks.js'
import { ModalIds } from '@components/Modal/type.js'
import ClientModal from '@components/ClientModal/ClientModal.js'
import SaleModal from '@components/SaleModal/SaleModal.js'

function AuthRoute(): JSX.Element {
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuth)

  const canAccess = authUser.token !== null

  useEffect(() => {
    if (!authUser.employee) {
      dispatch(open(ModalIds.AUTH_EMPLOYEE))
    }
  }, [authUser.employee])

  useEffect(() => {
    if (authUser.token !== null && authUser.user === null) {
      void login({ token: authUser.token }).then((result) => {
        if ('data' in result && result.data) {
          dispatch(userLogin(result.data))
          window.api.store.set('aio_api_key', result.data.token)
        } else {
          dispatch(logoutApp)
        }
      })
    }
  }, [authUser, canAccess])

  if (canAccess)
    return (
      <>
        <AuthModal />
        <ClientModal />
        <SaleModal />
        <Menu />
        <Outlet />
      </>
    )

  return <Navigate to="/" />
}

export default AuthRoute
