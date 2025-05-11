import { FC, useCallback, useState } from 'react'
import { addSku, selectCart, selectProducts } from '@services/carts/cartSlice.js'
import { skusExtendedApi } from '@services/skus/skusExtendedApi.js'
import { useAppDispatch, useAppSelector } from '@stores/hook.js'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit'
import CartItem from '../ProductCard/CartItem.tsx'
import QuickAction from '../Button/QuickAction.tsx'
import { PaymentMethod } from '@components/ProductList/types.js'
import { startSaleProcess } from '@services/sales/thunks.js'

const ProductList: FC = () => {
  const dispatch = useAppDispatch()
  const [barcode, setBarcode] = useState<string>('')
  const cart = useAppSelector(selectCart)
  const products = useAppSelector(selectProducts)

  // For product scan
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleScan = useCallback(async () => {
    if (!barcode.trim()) return

    setIsLoading(true)
    setIsError(false)
    setErrorMessage(null)

    try {
      const sku = await dispatch(
        skusExtendedApi.endpoints.getProductByBarcode.initiate(barcode)
      ).unwrap()

      dispatch(addSku(sku))
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError

      if ('status' in error) {
        const message =
          'data' in error && typeof error.data === 'object'
            ? (error.data as { message?: string }).message || 'Erreur serveur'
            : 'Erreur serveur'

        setIsError(true)
        setErrorMessage(message)
      } else {
        setIsError(true)
        setErrorMessage(error.message || 'Erreur inconnue')
      }
    } finally {
      setIsLoading(false)
      setBarcode('')
    }
  }, [barcode])

  const handlePayment = useCallback(
    async (method: PaymentMethod): Promise<void> => {
      const newSale = {
        ...cart,
        payment_method: method
      }
      dispatch(startSaleProcess(newSale))
    },
    [cart]
  )

  return (
    <div className={'flex flex-col flex-1 backdrop-blur-xs h-full p-5'}>
      <input
        autoFocus={true}
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') void handleScan()
        }}
        placeholder="Scanner un code-barres"
        className="mb-4 p-2 border rounded w-full"
      />
      {isLoading && <p>🔄 Recherche du produit...</p>}
      {isError && <p className="text-red-500">❌ {errorMessage}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
        {products.map((product) => (
          <CartItem cartItem={product} key={product.sku} />
        ))}
      </div>

      <div className="grid gap-2 mt-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <QuickAction onClick={() => handlePayment(PaymentMethod.CARD)}>Payment CB</QuickAction>
        <QuickAction onClick={() => handlePayment(PaymentMethod.CASH)}>Payment Cash</QuickAction>
      </div>
    </div>
  )
}

export default ProductList
