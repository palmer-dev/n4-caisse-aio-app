import { FC, useCallback } from 'react'
import { MCartItem } from '@models/Cart/MCart.js'
import { useAppDispatch } from '@stores/hook.js'
import { updateSkuQuantity } from '@services/carts/cartSlice.js'
import QuantityInput from '@components/ProductCard/QuantityInput.js'

interface CartItemProps {
  cartItem: MCartItem
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const dispatch = useAppDispatch()

  const handleQuantityChange = useCallback(
    (newQty: number) => {
      dispatch(updateSkuQuantity({ sku: cartItem.sku, quantity: newQty }))
    },
    [cartItem]
  )

  return (
    <div
      className={'aspect-square bg-gray-200/80 flex flex-col items-center p-3 rounded drop-shadow'}
    >
      <p className={'text-center'}>{cartItem.name}</p>
      <div className="flex-1"></div>
      <QuantityInput quantity={cartItem.quantity} onChange={handleQuantityChange} />
    </div>
  )
}

export default CartItem
