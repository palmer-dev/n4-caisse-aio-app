import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@stores/store.ts'
import { ICartState } from '@services/carts/types.js'
import { MSku } from '@models/Sku/MSku.js'
import { MCart, MCartItem } from '@models/Cart/MCart.js'
import { PaymentMethod } from '@components/ProductList/types.js'

// Define the initial state using that type
const initialState: ICartState = {
  discount: 0,
  skus: [],
  employee_id: undefined,
  client_id: undefined,
  shop_id: undefined,
  payment_method: PaymentMethod.CASH
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state = {
        ...initialState,
        shop_id: state.shop_id,
        employee_id: state.employee_id
      }
      return state
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload
      return state
    },
    setSkus: (state, action: PayloadAction<MCart['skus']>) => {
      state.skus = action.payload
    },
    addSku: (state, action: PayloadAction<MSku>) => {
      const existingItemIndex = state.skus.findIndex((item) => item.sku === action.payload.sku)

      if (existingItemIndex !== -1) {
        state.skus = state.skus.map((item) =>
          item.sku === action.payload.sku
            ? {
                ...item,
                unit_price: action.payload.unit_amount,
                quantity: item.quantity + 1
              }
            : item
        )
      } else {
        const newCartItem = new MCartItem({
          name: action.payload.name,
          sku: action.payload.sku,
          quantity: 1,
          unit_price: action.payload.unit_amount,
          unit_price_with_tax: action.payload.unit_amount_with_tax,
          has_discount: action.payload.has_discount,
          final_price: action.payload.final_price,
          discounts: action.payload.discounts
        })
        state.skus.push(newCartItem)
      }

      return state
    },
    updateSkuQuantity: (state, action: PayloadAction<{ sku: string; quantity: number }>) => {
      const { sku, quantity } = action.payload

      if (quantity == 0) {
        state.skus = state.skus.filter((item) => item.sku !== sku)
      } else {
        state.skus = state.skus.map((item) => (item.sku === sku ? { ...item, quantity } : item))
      }

      return state
    },
    removeSku: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.sku !== action.payload)
      return state
    },
    setCashier: (state, action: PayloadAction<string | undefined>) => {
      state.employee_id = action.payload
      return state
    },
    setCartShop: (state, action: PayloadAction<string | undefined>) => {
      state.shop_id = action.payload
      return state
    },
    setClient: (state, action: PayloadAction<string | undefined>) => {
      state.client_id = action.payload
      return state
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.payment_method = action.payload
      return state
    }
  }
})

export const {
  setDiscount,
  setSkus,
  addSku,
  removeSku,
  updateSkuQuantity,
  setCashier,
  setCartShop,
  setClient,
  setPaymentMethod,
  clearCart
} = cartSlice.actions

// Other code, such as selectors, can use the imported `RootState` type
export const selectCart = (state: RootState): ICartState => state.cart
export const selectDiscount = (state: RootState): number => state.cart.discount ?? 0
export const selectProducts = (state: RootState): MCartItem[] => state.cart.skus ?? []
export const selectEmployee = (state: RootState): string | undefined => state.cart.employee_id
export const selectClient = (state: RootState): string | undefined => state.cart.client_id
export const selectShop = (state: RootState): string | undefined => state.cart.shop_id

export default cartSlice.reducer
