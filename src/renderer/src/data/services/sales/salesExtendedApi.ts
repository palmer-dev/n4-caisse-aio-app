import { api } from '../api/apiSlice.ts'
import { MSale } from '@models/Sale/MSale.ts'
import { IResponse } from '@services/api/types.ts'
import { IAddSale, ISale, ISimulation } from '@services/sales/types.js'
import { ICartItem } from '@services/carts/types.js'

export const salesExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<MSale[], void>({
      query: () => '/sales',
      providesTags: (result = []) => [
        'Sale',
        ...result.map(({ id }) => ({ type: 'Sale' as const, id: id! }))
      ],
      transformResponse: (response: IResponse<ISale[]>) => response.data.map((c) => new MSale(c))
    }),
    getSale: builder.query<MSale, string>({
      query: (id) => ({
        url: `/sales/${id}`
      }),
      providesTags: (_, _1, arg) => [{ type: 'Sale', id: arg }],
      transformResponse: (response: IResponse<ISale>) => new MSale(response.data)
    }),
    getSalePdf: builder.query<string, string>({
      query: (id) => ({
        url: `/receipts/${id}/preview`,
        responseHandler: (response): Promise<Blob> => response.blob()
      }),
      transformResponse: (blob: Blob) => {
        return URL.createObjectURL(blob) // transforme le blob en URL utilisable dans une iframe
      }
    }),
    addSale: builder.mutation<MSale, IAddSale>({
      query: (cart) => {
        return {
          url: `/sales`,
          method: 'POST',
          body: cart
        }
      },
      transformResponse: (response: IResponse<ISale>) => new MSale(response.data)
    }),
    simulateSale: builder.mutation<ISimulation, ICartItem[]>({
      query: (cart) => {
        return {
          url: `/sales/compute`,
          method: 'POST',
          body: { skus: cart }
        }
      },
      transformResponse: (response: IResponse<ISimulation>) => response.data
    }),
    sendReceipt: builder.mutation<void, string>({
      query: (saleId) => {
        return {
          url: `/sales/${saleId}/send-receipt`,
          method: 'POST'
        }
      }
    })
  })
})

export const {
  useGetSalesQuery,
  useLazyGetSaleQuery,
  useGetSaleQuery,
  useAddSaleMutation,
  useSimulateSaleMutation,
  useSendReceiptMutation,
  useLazyGetSalePdfQuery
} = salesExtendedApi
