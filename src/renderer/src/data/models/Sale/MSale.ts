import { Model } from '@models/Model.ts'
import { MShop } from '../Shop/MShop.ts'
import { MUser } from '../User/MUser.ts'
import { ISale } from '@renderer/data/services/sales/types.ts'

export class MSale extends Model implements ISale {
  created_at: Date = new Date()
  shop?: MShop
  discount: number
  sub_total: number
  grand_total: number
  employee?: MUser
  client?: MUser

  constructor(props: ISale) {
    super(props)
    this.shop = props.shop ? new MShop(props.shop) : undefined
    this.discount = props.discount
    this.sub_total = props.sub_total
    this.grand_total = props.grand_total
    this.employee = props.employee ? new MUser(props.employee) : undefined
    this.client = props.client ? new MUser(props.client) : undefined
    this.created_at = new Date(props.created_at)
  }
}
