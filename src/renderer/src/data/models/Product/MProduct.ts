// Extending ClassFieldProperties to include nested access properties
import { Model } from '@models/Model.ts'
import { IProduct } from '@services/products/types.ts'
import { IShop } from '@renderer/data/services/shops/types.ts'
import { ISku } from '@renderer/data/services/skus/types.ts'

export class MProduct extends Model implements IProduct {
  // PROPERTIES
  name: string
  type: string
  slug: string
  description: string
  category_id: string
  vat_rate_id: string
  shop_id: string
  shop?: IShop | undefined
  sku: ISku
  product_attributes

  constructor(params: IProduct) {
    super(params)
    const {
      name,
      type,
      slug,
      description,
      category_id,
      vat_rate_id,
      shop_id,
      shop,
      sku,
      product_attributes
    } = params

    this.name = name
    this.type = type
    this.slug = slug
    this.description = description
    this.category_id = category_id
    this.vat_rate_id = vat_rate_id
    this.shop_id = shop_id
    this.shop = shop
    this.sku = sku
    this.product_attributes = product_attributes
  }
}
