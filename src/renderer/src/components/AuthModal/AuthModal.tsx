import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { close, selectModal } from '@services/modal/modalSlice.ts'
import Numpad from '@components/Numpad/Numpad.tsx'
import Button from '@components/Button/Button.tsx'
import { useAuthEmployeeMutation } from '@services/auth/authExtendedApi.ts'

const AuthModal = (): JSX.Element => {
  const [employeeId, setEmployeeId] = useState<string>('')
  const [login, { isError }] = useAuthEmployeeMutation()
  const dispatch = useDispatch()
  const modal = useSelector(selectModal)

  const authEmployee = useCallback(() => {
    if (employeeId !== null) {
      login(employeeId).then(({ data }) => {
        if (data) dispatch(close())
      })
    }
  }, [employeeId])

  if (!modal.isOpen) return <></>

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold text-gray-900" id="modal-title">
                    Enter code
                  </h3>
                  <div className="mt-2 mb-5">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of your data will be
                      permanently removed. This action cannot be undone.
                    </p>
                    <span className={'text-2xl mt-2'}>Employee number : {employeeId}</span>
                    <input
                      placeholder="API Token"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                  <Numpad value={employeeId} onChange={(e) => setEmployeeId(e)} />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center gap-4">
              <Button
                isError={isError}
                onClick={authEmployee}
                disabled={employeeId === null || employeeId === ''}
              >
                Login
              </Button>
              {isError && <p className={'text-xs text-red-600'}>Le code n&#39;est pas valide</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
