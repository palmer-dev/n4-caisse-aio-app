// Extending ClassFieldProperties to include nested access properties
import { Model } from '@models/Model.ts'
import { IRole } from '@services/roles/types.ts'

export class MRole extends Model {
  // PROPERTIES
  name: string | undefined

  constructor(params: IRole) {
    super(params)
    const { name } = params
    this.name = name
  }

  get forLabel(): { label: string; value: string } {
    return { label: this.name!, value: this.id! }
  }
}
