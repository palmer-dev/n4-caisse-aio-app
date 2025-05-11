import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '@services/auth/types.ts'
import { RootState } from '@stores/store.ts'
import { MUser } from '@models/User/MUser.ts'
import { AuthResponse } from '@services/auth/authExtendedApi.ts'

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
      if (state.employee) {
        state.employee = initialState.employee
      } else {
        state = initialState
        window.api.store.delete('aio_api_key')
      }
      // Clear data
      return state
    },
    setLogin: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      return state
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      return state
    },
    setEmployee: (state, action: PayloadAction<MUser>) => {
      state.employee = action.payload
      return state
    }
  }
})

export const { setToken, logout, setUser, setLogin, setEmployee } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState): MUser | null => state.auth?.user ?? null
export const selectAuth = (state: RootState): IAuthState => state.auth
export const selectEmployee = (state: RootState): MUser | null => state.auth?.employee ?? null

export default authSlice.reducer
