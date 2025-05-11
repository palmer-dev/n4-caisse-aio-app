import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { RootState } from '@stores/store.ts'

// Define a base query with proper typing
const baseApi: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  // credentials: 'include',
  prepareHeaders: async (headers, { getState }) => {
    const token: string | null = (getState() as RootState)?.auth?.token ?? null
    if (!headers.has('Authorization') && token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    return headers
  }
})

// Define a service using a base query and expected endpoints
export const api = createApi({
  baseQuery: baseApi,
  tagTypes: ['User', 'Shop', 'Role', 'Sale', 'Product', 'Sku', 'Client'],
  endpoints: () => ({})
})
