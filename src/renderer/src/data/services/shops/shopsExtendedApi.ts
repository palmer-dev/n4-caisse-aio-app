import { api } from '../api/apiSlice.ts'
import { MShop } from '@models/Shop/MShop.ts'
import { IResponse } from '@services/api/types.ts'
import { IShop } from '@services/shops/types.ts'

export const shopsExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<MShop[], void>({
      query: () => '/shops',
      providesTags: (result = []) => [
        'Shop',
        ...result.map(({ id }) => ({ type: 'Shop' as const, id: id! }))
      ],
      transformResponse: (response: IResponse<IShop[]>) => response.data.map((c) => new MShop(c))
    }),
    getShop: builder.query<MShop, string>({
      query: (id) => `/shops/${id}`,
      providesTags: (_, _1, arg) => [{ type: 'Shop', id: arg }],
      transformResponse: (response: IResponse<IShop>) => new MShop(response.data)
    })
  })
})

export const { useGetShopsQuery, useGetShopQuery } = shopsExtendedApi
