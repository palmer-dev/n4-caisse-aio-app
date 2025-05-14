import { AppThunk } from '@stores/hook.js'
import { clearCart, setPaymentMethod } from '@services/carts/cartSlice.js'
import { IAddSale } from '@services/sales/types.js'
import { close, open } from '@services/modal/modalSlice.js'
import { ModalIds } from '@components/Modal/type.js'
import { clearSale } from '@services/sales/saleSlice.js'

export const startSaleProcess =
  (cart: IAddSale): AppThunk =>
  (dispatch) => {
    dispatch(setPaymentMethod(cart.payment_method))
    dispatch(open(ModalIds.SEARCH_CLIENT))
  }

export const endSale = (): AppThunk => (dispatch) => {
  dispatch(clearCart())
  dispatch(clearSale())
  dispatch(close())
}
