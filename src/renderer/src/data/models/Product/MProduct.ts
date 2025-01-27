// Extending ClassFieldProperties to include nested access properties
import { Model } from '@models/Model'
import { IRole } from '@services/roles/types'
import { IProduct } from '@services/products/types'

export class MProduct extends Model implements IProduct {
  // PROPERTIES
  name: string

  constructor(params: IRole) {
    super(params)
    const { name } = params
    this.name = name
  }

  get forLabel(): { label: string; value: string } {
    return { label: this.name!, value: this._id! }
  }
}
