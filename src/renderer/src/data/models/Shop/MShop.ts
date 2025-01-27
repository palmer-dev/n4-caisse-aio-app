import { IShop } from '@services/shops/types.ts'
import { Model } from '@models/Model.ts'

export class MShop extends Model implements IShop {
  name: string

  constructor(props: IShop) {
    super(props)

    this.name = props.name
  }
}
