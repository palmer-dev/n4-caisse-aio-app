import { IModel } from '@models/Model.ts'
import { PaymentMethod } from '@components/ProductList/types.js'

export interface ICartItem {
  sku: string
  name: string
  unit_price: number
  unit_price_with_tax: number
  quantity: number
}

export interface ICart extends IModel {
  employee_id?: string
  client_id?: string
  shop_id?: string
  discount: number
  payment_method: PaymentMethod
  skus: ICartItem[]
}

export type ICartState = Pick<
  ICart,
  'employee_id' | 'client_id' | 'shop_id' | 'discount' | 'skus' | 'payment_method'
>
