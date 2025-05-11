import { api } from '../api/apiSlice.ts'
import { MRole } from '@models/Role/MRole.ts'
import { IResponse } from '@services/api/types.ts'
import { IRole } from '@services/roles/types.ts'

export const roleExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<MRole[], void>({
      query: () => '/roles',
      providesTags: (result = []) => [
        'Role',
        ...result.map(({ id }) => ({ type: 'Role' as const, id: id! }))
      ],
      transformResponse: (response: IResponse<IRole[]>) => response.data.map((c) => new MRole(c))
    }),
    getRole: builder.query<MRole, string>({
      query: (id) => `/roles/${id}`,
      providesTags: (_, _1, arg) => [{ type: 'Role', id: arg }],
      transformResponse: (response: IResponse<IRole>) => new MRole(response.data)
    })
  })
})

export const { useGetRolesQuery, useGetRoleQuery } = roleExtendedApi
