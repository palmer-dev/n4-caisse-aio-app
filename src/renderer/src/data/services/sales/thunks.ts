import { AppThunk } from '@stores/hook.js'
import { setPaymentMethod } from '@services/carts/cartSlice.js'
import { IAddSale } from '@services/sales/types.js'
import { open } from '@services/modal/modalSlice.js'
import { ModalIds } from '@components/Modal/type.js'

export const startSaleProcess =
  (cart: IAddSale): AppThunk =>
  (dispatch) => {
    dispatch(setPaymentMethod(cart.payment_method))
    dispatch(open(ModalIds.SEARCH_CLIENT))
  }
