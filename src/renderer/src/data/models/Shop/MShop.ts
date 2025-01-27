import { IShop } from '@services/shops/types'
import { Model } from '@models/Model'

export class MShop extends Model implements IShop {
  name: string

  constructor(props: IShop) {
    super(props)

    this.name = props.name
  }
}
