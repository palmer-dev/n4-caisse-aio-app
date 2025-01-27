// Extending ClassFieldProperties to include nested access properties
import { Model } from '@models/Model'
import { IRole } from '@services/roles/types'

export class MRole extends Model {
  // PROPERTIES
  name: string | undefined

  constructor(params: IRole) {
    super(params)
    const { name } = params
    this.name = name
  }

  get forLabel(): { label: string; value: string } {
    return { label: this.name!, value: this._id! }
  }
}
