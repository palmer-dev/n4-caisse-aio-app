import { Model } from '@models/Model.ts'
import { IUser } from '@services/users/types.ts'
import { HasLabel, Label } from '@renderer/types/Labelisable.ts'

export class MUser extends Model implements HasLabel<string>, IUser {
  email: string
  firstname: string
  lastname: string
  shop_id: string

  constructor(params: IUser) {
    super(params)
    const { email, firstname, lastname, shop_id } = params
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.shop_id = shop_id
  }

  get label(): Label<string> {
    return { label: this.fullName, value: this.id! }
  }

  get fullName(): string {
    return `${this.lastname} ${this.firstname}`
  }
}
