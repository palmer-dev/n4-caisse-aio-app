import { api } from '../api/apiSlice.ts'
import { MSku } from '@models/Sku/MSku.ts'
import { IResponse } from '@services/api/types.ts'
import { ISku } from '@services/skus/types.js'

export const skusExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductBySku: builder.query<MSku, string>({
      query: (sku) => `/skus/${sku}`,
      providesTags: (_, _1, arg) => [{ type: 'Sku', id: arg }],
      transformResponse: (response: IResponse<ISku>) => new MSku(response.data)
    }),
    getProductByBarcode: builder.query<MSku, string>({
      query: (barcode) => `/scan/${barcode}`,
      providesTags: (_, _1, arg) => [{ type: 'Sku', id: arg }],
      transformResponse: (response: IResponse<ISku>) => new MSku(response.data)
    })
  })
})

export const { useGetProductBySkuQuery, useLazyGetProductByBarcodeQuery } = skusExtendedApi
