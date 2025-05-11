import { Model } from '@models/Model.ts'
import { ICart, ICartItem } from '@renderer/data/services/carts/types.ts'

export class MCart extends Model implements ICart {
  client_id?: string = undefined
  discount: number = 0
  employee_id?: string = undefined
  shop_id?: string = undefined
  skus: ICartItem[] = []
  total: number = 0
  grand_total: number = 0

  constructor(props: ICart) {
    super(props)

    this.client_id = props.client_id
    this.discount = props.discount
    this.employee_id = props.employee_id
    this.shop_id = props.shop_id
    this.skus = props.skus
  }
}

export class MCartItem implements ICartItem {
  name: string
  quantity: number
  sku: string
  unit_price: number
  unit_price_with_tax: number = 0

  constructor({ name, quantity, unit_price, sku, unit_price_with_tax }: ICartItem) {
    this.name = name
    this.quantity = quantity
    this.sku = sku
    this.unit_price = unit_price
    this.unit_price_with_tax = unit_price_with_tax
  }
}
