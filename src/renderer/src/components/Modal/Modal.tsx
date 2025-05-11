import { ReactNode } from 'react'
import { selectModal } from '@services/modal/modalSlice.ts'
import { useAppSelector } from '@stores/hook.js'
import { ModalIds } from '@components/Modal/type.js'

interface ModalProps {
  children: ReactNode
  footer?: ReactNode
  id: ModalIds
  className?: string
}

const Modal = ({ children, footer, id, className }: ModalProps): JSX.Element => {
  const modal = useAppSelector(selectModal)

  if (!modal.isOpen || modal.modalId !== id) return <></>

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={
              'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md ' +
              className
            }
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">{children}</div>
              </div>
            </div>
            {footer && (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center gap-4">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
