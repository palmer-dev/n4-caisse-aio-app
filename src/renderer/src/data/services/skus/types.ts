import { IModel } from '@models/Model.ts'
import { IProduct } from '@services/products/types.js'

export interface ISku extends IModel {
  sku: string
  name: string
  currency_code: string
  unit_amount: number
  unit_amount_with_tax: number
  product: IProduct
}
