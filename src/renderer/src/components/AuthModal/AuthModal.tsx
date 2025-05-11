import { ReactNode, useCallback, useState } from 'react'
import { close } from '@services/modal/modalSlice.ts'
import Numpad from '@components/Numpad/Numpad.tsx'
import Button from '@components/Button/Button.tsx'
import { useAuthEmployeeMutation } from '@services/auth/authExtendedApi.ts'
import { useAppDispatch } from '@stores/hook.js'
import { setEmployeeAndUpdateCashier } from '@services/auth/thunks.js'
import { ModalIds } from '@components/Modal/type.js'
import Modal from '@components/Modal/Modal.js'

const AuthModal = (): JSX.Element => {
  const [employeeId, setEmployeeId] = useState<string>('')
  const [login, { isError }] = useAuthEmployeeMutation()
  const dispatch = useAppDispatch()

  const authEmployee = useCallback(() => {
    if (employeeId !== null) {
      login(employeeId).then(({ data }) => {
        if (data) {
          dispatch(setEmployeeAndUpdateCashier(data))
          // Close modal
          dispatch(close())
          setEmployeeId('')
        }
      })
    }
  }, [employeeId])

  const footer: ReactNode = (
    <>
      <Button
        isError={isError}
        onClick={authEmployee}
        disabled={employeeId === null || employeeId === ''}
      >
        Login
      </Button>
      {isError && <p className={'text-xs text-red-600'}>Le code n&#39;est pas valide</p>}
    </>
  )

  return (
    <Modal id={ModalIds.AUTH_EMPLOYEE} footer={footer}>
      <h3 className="text-base font-semibold text-gray-900" id="modal-title">
        Enter code
      </h3>
      <div className="mt-2 mb-5">
        <p className="text-sm text-gray-500">
          Are you sure you want to deactivate your account? All of your data will be permanently
          removed. This action cannot be undone.
        </p>
        <span className={'text-2xl mt-2'}>Employee number : {employeeId}</span>
        <input
          placeholder="Employee Code"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          autoFocus={true}
          onKeyDown={(e) => {
            e.key === 'Enter' && authEmployee()
          }}
          className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
        />
      </div>
      <Numpad value={employeeId} onChange={(e) => setEmployeeId(e)} />
    </Modal>
  )
}

export default AuthModal
