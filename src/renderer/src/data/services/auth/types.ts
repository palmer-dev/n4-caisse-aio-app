// Define a type for the slice state

import { MUser } from '@models/User/MUser.ts'

export interface IAuthState {
  user: MUser | null
  token: string | null
  employee: MUser | null
}
