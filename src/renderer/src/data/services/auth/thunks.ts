import { AppThunk } from '@stores/hook.js'
import { logout, setEmployee, setLogin } from '@services/auth/authSlice.js'
import { MUser } from '@renderer/data/models/User/MUser.ts'
import { setCartShop, setCashier } from '@services/carts/cartSlice.js'
import { AuthResponse } from '@services/auth/authExtendedApi.js'

export const setEmployeeAndUpdateCashier =
  (employee: MUser): AppThunk =>
  (dispatch) => {
    dispatch(setEmployee(employee))
    dispatch(setCashier(employee.id!))
  }

export const userLogin =
  (data: AuthResponse): AppThunk =>
  (dispatch) => {
    dispatch(setLogin(data))
    dispatch(setCartShop(data.user.shop_id))
  }

export const logoutApp = (): AppThunk => (dispatch, getState) => {
  const { employee } = getState().auth

  dispatch(setCashier(employee?.id ?? undefined))

  dispatch(logout())
}
