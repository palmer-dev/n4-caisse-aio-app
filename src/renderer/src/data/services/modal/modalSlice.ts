import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@stores/store.ts'
import { ModalType } from '@services/modal/types.ts'
import { ModalIds } from '@components/Modal/type.js'

// Define the initial state using that type
const initialState: ModalType = {
  isOpen: false,
  modalId: null
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ModalIds>) => {
      state.isOpen = true
      state.modalId = action.payload
      return state
    },
    close: (state) => {
      state.isOpen = false
      state.modalId = null
      return state
    }
  }
})

export const { open, close } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState): ModalType => state.modal
export default modalSlice.reducer
