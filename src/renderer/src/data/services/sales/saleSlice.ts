import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@stores/store.ts'
import { MSale } from '@models/Sale/MSale.js'
import { ISale, ISaleState } from '@services/sales/types.js'

// Define the initial state using that type
const initialState: ISaleState = {
  sale_id: null,
  sale: null
}

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    setSaleId: (state, action: PayloadAction<string>) => {
      state.sale_id = action.payload
      return state
    },
    setSale: (state, action: PayloadAction<ISale>) => {
      state.sale = new MSale(action.payload)
    },
    clearSale: (state) => {
      state = initialState
      return state
    }
  }
})

export const { setSaleId, setSale, clearSale } = saleSlice.actions

export const selectSale = (state: RootState): MSale | null => state.sale.sale
export const selectSaleId = (state: RootState): string | null => state.sale.sale_id

export default saleSlice.reducer
