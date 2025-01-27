import { IModel } from '@models/Model.ts'
import { IShop } from '@services/shops/types.ts'

export interface IEmployee extends IModel {
  firstname: string
  lastname: string
  email: string
  phone: string
  code: string
  shop_id: string
  shop?: IShop
}
