import { IModel } from '@models/Model'
import { IShop } from '@services/shops/types'

export interface IEmployee extends IModel {
  firstname: string
  lastname: string
  email: string
  phone: string
  code: string
  shop_id: string
  shop?: IShop
}
