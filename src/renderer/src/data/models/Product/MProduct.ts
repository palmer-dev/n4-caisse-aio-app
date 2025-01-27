// Extending ClassFieldProperties to include nested access properties
import { Model } from '@models/Model.ts'
import { IRole } from '@services/roles/types.ts'
import { IProduct } from '@services/products/types.ts'

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
