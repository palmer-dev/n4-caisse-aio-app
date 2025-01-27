import { api } from '../api/apiSlice.ts'
import { MProduct } from '@models/Product/MProduct.ts'
import { IResponse } from '@services/api/types.ts'
import { IProduct } from '@services/products/types.ts'

export const ambassadorExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAmbassadorsWithStats: builder.query<MProduct[], void>({
      query: () => '/api/ambassador/with-stats',
      providesTags: (result = []) => [
        'Role',
        ...result.map(({ _id }) => ({ type: 'Role' as const, id: _id! }))
      ],
      transformResponse: (response: IResponse<IProduct[]>) =>
        response.data.map((c) => new MProduct(c))
    })
  })
})

export const { useGetAmbassadorsWithStatsQuery } = ambassadorExtendedApi
