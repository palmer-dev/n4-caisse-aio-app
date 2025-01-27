import { Model } from '@models/Model.ts'
import { IUser } from '@services/users/types.ts'
import { HasLabel, Label } from '@renderer/types/Labelisable.ts'

export class MUser extends Model implements HasLabel<string>, IUser {
  email: string
  firstname: string
  lastname: string

  constructor(params: IUser) {
    super(params)
    const { email, firstname, lastname } = params
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
  }

  get label(): Label<string> {
    return { label: this.fullName, value: this._id! }
  }

  get fullName(): string {
    return `${this.lastname} ${this.firstname}`
  }
}
