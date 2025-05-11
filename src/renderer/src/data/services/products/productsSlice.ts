import { api } from '../api/apiSlice.ts'
import { MProduct } from '@models/Product/MProduct.ts'
import { IResponse } from '@services/api/types.ts'
import { IProduct } from '@services/products/types.ts'

export const productExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<MProduct[], void>({
      query: () => '/products',
      providesTags: (result = []) => [
        'Product',
        ...result.map(({ id }) => ({ type: 'Product' as const, id: id! }))
      ],
      transformResponse: (response: IResponse<IProduct[]>) =>
        response.data.map((c) => new MProduct(c))
    })
  })
})

export const { useGetProductsQuery } = productExtendedApi
