import { api } from '../api/apiSlice'
import { MProduct } from '@models/Product/MProduct'
import { IResponse } from '@services/api/types'
import { IProduct } from '@services/products/types'

export const ambassadorExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAmbassadorsWithStats: builder.query<MProduct[], void>({
      query: () => '/api/ambassador/with-stats',
      providesTags: (result = []) => [
        'Ambassador',
        ...result.map(({ _id }) => ({ type: 'Ambassador' as const, id: _id! }))
      ],
      transformResponse: (response: IResponse<IProduct[]>) =>
        response.data.map((c) => new MProduct(c))
    })
  })
})

export const { useGetAmbassadorsWithStatsQuery } = ambassadorExtendedApi
