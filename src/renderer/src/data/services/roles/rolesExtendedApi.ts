import { api } from '../api/apiSlice'
import { MRole } from '@models/Role/MRole'
import { IResponse } from '@services/api/types'
import { IRole } from '@services/roles/types'

export const roleExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<MRole[], void>({
      query: () => '/api/roles',
      providesTags: (result = []) => [
        'Role',
        ...result.map(({ _id }) => ({ type: 'Role' as const, id: _id! }))
      ],
      transformResponse: (response: IResponse<IRole[]>) => response.data.map((c) => new MRole(c))
    }),
    getRole: builder.query<MRole, string>({
      query: (id) => `/api/roles/${id}`,
      providesTags: (_, _1, arg) => [{ type: 'Role', id: arg }],
      transformResponse: (response: IResponse<IRole>) => new MRole(response.data)
    })
  })
})

export const { useGetRolesQuery, useGetRoleQuery } = roleExtendedApi
