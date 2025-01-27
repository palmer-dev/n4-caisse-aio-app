import { IShop } from '@services/shops/types'
import { Model } from '@models/Model'
import { IEmployee } from '@services/employees/types'

export class MEmployee extends Model implements IEmployee {
  firstname: string
  lastname: string
  email: string
  phone: string
  code: string
  shop_id: string
  shop?: IShop | undefined

  constructor(params: IEmployee) {
    super(params)
    this.firstname = params.firstname
    this.lastname = params.lastname
    this.email = params.email
    this.phone = params.phone
    this.code = params.code
    this.shop_id = params.shop_id
    this.shop = params.shop
  }
}
