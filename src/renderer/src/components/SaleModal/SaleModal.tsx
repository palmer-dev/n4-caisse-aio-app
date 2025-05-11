import { FC, useEffect, useMemo } from 'react'
import Button from '@components/Button/Button.tsx'
import { ModalIds } from '@components/Modal/type.js'
import Modal from '@components/Modal/Modal.js'
import { useAppSelector } from '@stores/hook.js'
import { selectSaleId } from '@services/sales/saleSlice.js'
import {
  useLazyGetSalePdfQuery,
  useSendReceiptMutation
} from '@renderer/data/services/sales/salesExtendedApi.ts'

const SaleModal: FC = () => {
  const saleId = useAppSelector(selectSaleId)
  const [sendReceipt] = useSendReceiptMutation()
  const [loadSalePdf, { data: salePdf, isLoading: isPdfLoading }] = useLazyGetSalePdfQuery()

  useEffect(() => {
    if (saleId) {
      loadSalePdf(saleId)
    }
  }, [saleId])

  const handleSendReceipt = async (): Promise<void> => {
    if (saleId) {
      sendReceipt(saleId)
    }
  }

  const footer = useMemo(() => {
    return <Button onClick={handleSendReceipt}>Envoyer le reçu</Button>
  }, [])

  useEffect(() => {
    // if (salePdf)
    console.log(salePdf)
  }, [salePdf])

  return (
    <Modal className={'sm:max-w-2xl!'} id={ModalIds.SALE} footer={footer}>
      <h3 className="text-base font-semibold text-gray-900 mb-4" id="modal-title">
        Vente enregistrée !
      </h3>
      <div>
        {!isPdfLoading && salePdf && (
          <iframe src={salePdf} className="w-full h-[50vh]" title="PDF Viewer" />
        )}
      </div>
    </Modal>
  )
}

export default SaleModal
