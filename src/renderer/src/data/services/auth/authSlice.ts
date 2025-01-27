import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '@services/auth/types'
import { RootState } from '@stores/store'
import { MUser } from '@models/User/MUser'
import { AuthResponse } from '@services/auth/authExtendedApi'

// Define the initial state using that type
const initialState: IAuthState = {
  user: null,
  token: null,
  employee: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<MUser>) => {
      state.user = action.payload
      return state
    },
    logout: (state) => {
      state = initialState
      // Clear data
      window.api.store.delete('aio_api_key')
      return state
    },
    setLogin: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      return state
    }
  }
})

export const { logout, setUser, setLogin } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState): MUser | null => state.auth?.user ?? null
export const selectAuth = (state: RootState): IAuthState => state.auth

export default authSlice.reducer
