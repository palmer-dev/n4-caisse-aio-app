import { IModel } from '@models/Model.ts'
import { IProduct } from '@services/products/types.js'

export enum DiscountType {
  PERCENT = 'percent',
  AMOUNT = 'amount'
}

export interface IDiscount {
  name: string
  type: DiscountType
  value: number
}

export interface ISku extends IModel {
  sku: string
  name: string
  currency_code: string
  unit_amount: number
  unit_amount_with_tax: number
  final_price: number
  has_discount: boolean
  product: IProduct
  discounts: IDiscount[]
}
