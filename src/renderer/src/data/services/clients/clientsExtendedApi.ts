import { api } from '../api/apiSlice.ts'
import { MClient } from '@models/Client/MClient.ts'
import { IResponse } from '@services/api/types.ts'
import { IClient, ISearchClient } from '@services/clients/types.js'

export const clientsExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchClient: builder.mutation<MClient[], ISearchClient>({
      query: (search) => ({
        url: '/clients/search',
        method: 'POST',
        body: search
      }),
      transformResponse: (response: IResponse<IClient[]>) =>
        response.data.map((c) => new MClient(c))
    }),
    getClient: builder.query<MClient, string>({
      query: (fidelityNumber) => `/clients/${fidelityNumber}`,
      providesTags: (_, _1, arg) => [{ type: 'Client', id: arg }],
      transformResponse: (response: IResponse<IClient>) => new MClient(response.data)
    }),
    addClient: builder.mutation<MClient, MClient>({
      query: (cart) => {
        return {
          url: `/clients`,
          method: 'POST',
          body: cart
        }
      },
      transformResponse: (response: IResponse<IClient>) => new MClient(response.data)
    })
  })
})

export const {
  useSearchClientMutation,
  useLazyGetClientQuery,
  useGetClientQuery,
  useAddClientMutation
} = clientsExtendedApi
