import { IModel } from '@models/Model.ts'
import { IShop } from '../shops/types.ts'
import { ISku } from '@services/skus/types.js'

export interface IProduct extends IModel {
  name: string
  type: string
  slug: string
  description: string
  category_id: string
  vat_rate_id: string
  shop_id: string
  shop?: IShop
  sku: ISku
  product_attributes: []
}
