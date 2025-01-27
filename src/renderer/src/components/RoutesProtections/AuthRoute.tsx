import { Navigate, Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '@services/auth/authSlice.ts'
import { useEffect } from 'react'
import { open } from '@services/modal/modalSlice.ts'
import AuthModal from '@components/AuthModal/AuthModal.tsx'

function AuthRoute(): JSX.Element {
  const dispatch = useDispatch()
  const authUser = useSelector(selectAuth)

  const canAccess = authUser.token !== null

  useEffect(() => {
    if (!authUser.employee) {
      dispatch(open())
    }
  }, [authUser])

  if (canAccess)
    return (
      <>
        <AuthModal />
        <Outlet />
      </>
    )

  return <Navigate to="/" />
}

export default AuthRoute
