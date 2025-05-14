// Extending ClassFieldProperties to include nested access properties
import { Model } from '@models/Model.ts'
import { DiscountType, IDiscount, ISku } from '@services/skus/types.js'
import { MProduct } from '../Product/MProduct.ts'
import { CurrencyFormatter } from '@renderer/lib/CurrencyFormatter.js'
import { PercentageFormatter } from '@renderer/lib/PercentageFormatter.js'

export class MDiscount implements IDiscount {
  name: string
  type: DiscountType
  value: number

  constructor({ name, type, value }: IDiscount) {
    this.name = name
    this.type = type
    this.value = value

    if (type === DiscountType.PERCENT) this.value = this.value > 1 ? this.value / 100 : this.value
  }

  get label(): string {
    if (this.type === DiscountType.PERCENT)
      return `${this.name} (${new PercentageFormatter().format(this.value)})`

    return `${this.name} (${new CurrencyFormatter().format(this.value)})`
  }
}

export class MSku extends Model implements ISku {
  // PROPERTIES
  name: string
  sku: string
  currency_code: string
  unit_amount: number
  unit_amount_with_tax: number
  final_price: number
  has_discount: boolean
  product: MProduct
  discounts: MDiscount[] = []

  constructor(params: ISku) {
    super(params)
    this.name = params.name
    this.sku = params.sku
    this.currency_code = params.currency_code
    this.unit_amount = params.unit_amount
    this.final_price = params.final_price
    this.has_discount = params.has_discount
    this.unit_amount_with_tax = params.unit_amount_with_tax
    this.product = new MProduct(params.product)
    this.discounts = params.discounts.map((discount) => new MDiscount(discount))
  }
}
