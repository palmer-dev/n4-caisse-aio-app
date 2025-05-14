import { FC, useCallback, useEffect, useMemo } from 'react'
import Button from '@components/Button/Button.tsx'
import { ModalIds } from '@components/Modal/type.js'
import Modal from '@components/Modal/Modal.js'
import { useAppDispatch, useAppSelector } from '@stores/hook.js'
import { selectSaleId } from '@services/sales/saleSlice.js'
import {
  useLazyGetSalePdfQuery,
  useSendReceiptMutation
} from '@renderer/data/services/sales/salesExtendedApi.ts'
import { endSale } from '@services/sales/thunks.js'

const SaleModal: FC = () => {
  const dispatch = useAppDispatch()
  const saleId = useAppSelector(selectSaleId)
  const [
    sendReceipt,
    {
      isLoading: isReceiptLoading,
      reset: resetSending,
      isSuccess: sentSuccessfully,
      isError,
      error
    }
  ] = useSendReceiptMutation()
  const [loadSalePdf, { data: salePdf, isLoading: isPdfLoading }] = useLazyGetSalePdfQuery()

  useEffect(() => {
    if (saleId) {
      loadSalePdf(saleId)
      console.log('ICI')
      resetSending()
    }
  }, [saleId])

  const handleSendReceipt = useCallback(async (): Promise<void> => {
    if (saleId) {
      sendReceipt(saleId)
    }
  }, [saleId])

  const handleNext = useCallback(async (): Promise<void> => {
    dispatch(endSale())
  }, [])

  useEffect(() => {
    console.log(error)
  }, [error])

  const footer = useMemo(() => {
    return (
      <>
        <Button onClick={handleNext}>Client suivant</Button>
        <Button
          isLoading={isReceiptLoading}
          onClick={handleSendReceipt}
          isError={isError}
          disabled={!saleId || sentSuccessfully}
          className={'mr-auto'}
        >
          {sentSuccessfully ? 'Envoyé' : 'Envoyer le reçu'}
        </Button>
      </>
    )
  }, [isReceiptLoading, handleSendReceipt, saleId, sentSuccessfully, handleNext, isError])

  return (
    <Modal className={'sm:max-w-2xl!'} id={ModalIds.SALE} footer={footer}>
      <h3 className="text-base font-semibold text-gray-900 mb-4 dark:text-white" id="modal-title">
        Vente enregistrée !
      </h3>
      <div>
        {isPdfLoading && <p>Ticket is loading...</p>}
        {!isPdfLoading && salePdf && (
          <iframe src={salePdf} className="w-full h-[50vh]" title="PDF Viewer" />
        )}
      </div>
    </Modal>
  )
}

export default SaleModal
