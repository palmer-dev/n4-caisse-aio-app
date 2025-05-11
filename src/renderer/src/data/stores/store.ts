import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from '@services/auth/authSlice.ts'
import { api } from '@services/api/apiSlice.ts'
import modalSlice from '@services/modal/modalSlice.ts'
import cartSlice from '@services/carts/cartSlice.ts'
import saleSlice from '@services/sales/saleSlice.ts'

const rootReducer = combineReducers({
  modal: modalSlice,
  auth: authSlice,
  cart: cartSlice,
  sale: saleSlice,
  api: api.reducer
})

const preloadedState = {
  auth: {
    user: null,
    token: window.api.store.get('aio_api_key') ?? null,
    employee: null
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
