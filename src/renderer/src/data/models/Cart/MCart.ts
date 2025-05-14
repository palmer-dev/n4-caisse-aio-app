import { ICart, ICartItem } from '@renderer/data/services/carts/types.ts'
import { MDiscount } from '@models/Sku/MSku.js'
import { Model } from '@models/Model.js'
import { PaymentMethod } from '@renderer/components/ProductList/types.ts'

export class MCart extends Model implements ICart {
  client_id?: string = undefined
  discount: number = 0
  employee_id?: string = undefined
  shop_id?: string = undefined
  skus: MCartItem[] = []
  total: number = 0
  grand_total: number = 0
  payment_method: PaymentMethod

  constructor(props: ICart) {
    super(props)

    this.client_id = props.client_id
    this.discount = props.discount
    this.employee_id = props.employee_id
    this.shop_id = props.shop_id
    this.skus = props.skus.map((sku) => new MCartItem(sku))
    this.payment_method = props.payment_method
  }
}

export class MCartItem implements ICartItem {
  name: string
  quantity: number
  sku: string
  unit_price: number
  unit_price_with_tax: number = 0
  final_price: number
  has_discount: boolean = false
  discounts: MDiscount[] = []

  constructor({
    name,
    quantity,
    unit_price,
    sku,
    unit_price_with_tax,
    final_price,
    has_discount,
    discounts
  }: ICartItem) {
    this.name = name
    this.quantity = quantity
    this.sku = sku
    this.unit_price = unit_price
    this.unit_price_with_tax = unit_price_with_tax
    this.final_price = final_price
    this.has_discount = has_discount
    this.discounts = discounts.map((discount) => new MDiscount(discount))
  }
}
