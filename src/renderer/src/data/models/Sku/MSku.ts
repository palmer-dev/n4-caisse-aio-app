// Extending ClassFieldProperties to include nested access properties
import { Model } from '@models/Model.ts'
import { ISku } from '@services/skus/types.js'
import { MProduct } from '../Product/MProduct.ts'

export class MSku extends Model implements ISku {
  // PROPERTIES
  name: string
  sku: string
  currency_code: string
  unit_amount: number
  unit_amount_with_tax: number
  product: MProduct

  constructor(params: ISku) {
    super(params)
    this.name = params.name
    this.sku = params.sku
    this.currency_code = params.currency_code
    this.unit_amount = params.unit_amount
    this.unit_amount_with_tax = params.unit_amount_with_tax
    this.product = new MProduct(params.product)
  }
}
