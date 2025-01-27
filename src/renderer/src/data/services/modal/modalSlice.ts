import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@stores/store.ts'
import { ModalType } from '@services/modal/types.ts'

// Define the initial state using that type
const initialState: ModalType = {
  isOpen: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
      return state
    },
    close: (state) => {
      state.isOpen = false
      return state
    }
  }
})

export const { open, close } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState): ModalType => state.modal
export default modalSlice.reducer
