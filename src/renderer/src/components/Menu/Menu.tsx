import Button from '../Button/Button.tsx'
import { IoLogOutOutline } from 'react-icons/io5'
import { selectEmployee } from '@services/auth/authSlice.js'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@stores/hook.js'
import { logoutApp } from '@services/auth/thunks.js'

function Menu(): JSX.Element {
  const employee = useAppSelector(selectEmployee)
  const dispatch = useAppDispatch()

  const logoutUser = useCallback((): void => {
    if (!employee) {
      if (!confirm('Êtes vous sûr de vouloir déconnecter la caisse ')) {
        return
      }
    }
    dispatch(logoutApp())
  }, [dispatch, employee])

  return (
    <div className="menu flex justify-between items-center z-20 w-full px-2 py-3 shadow bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-xs border-b border-gray-100">
      <Button onClick={logoutUser}>
        Logout &nbsp;
        <IoLogOutOutline className="text-2xl" />
      </Button>
      {employee && (
        <p>
          Employé(e): <strong>{employee?.fullName}</strong>
        </p>
      )}
    </div>
  )
}

export default Menu
