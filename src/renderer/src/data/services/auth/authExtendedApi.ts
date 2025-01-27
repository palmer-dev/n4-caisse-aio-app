// Need to use the React-specific entry point to import createApi
import { api } from '../api/apiSlice'
import { IAuthResponse } from '@services/api/types'
import { MUser } from '@models/User/MUser'
import { IUser } from '@services/users/types'

export interface AuthResponse {
  user: MUser
  token: string
}

interface Credentials {
  token: string
}

// Define a service using a base URL and expected endpoints
export const authExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, Credentials>({
      query: (credentials) => {
        return {
          url: `/auth/login`,
          method: 'POST',
          body: credentials
        }
      },
      transformResponse: (response: IAuthResponse<AuthResponse>) => ({
        user: MUser.fromApi(response.data.user),
        token: response.data.token
      })
    }),
    authEmployee: builder.mutation<MUser, string>({
      query: (employeeCode) => ({
        url: `/employees/auth`,
        method: 'POST',
        body: { code: employeeCode }
      }),
      transformResponse: (response: IAuthResponse<IUser>) => MUser.fromApi(response.data)
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useAuthEmployeeMutation } = authExtendedApi
