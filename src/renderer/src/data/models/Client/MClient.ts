import { Model } from '@models/Model.ts'
import { IClient } from '@services/clients/types.ts'

export class MClient extends Model implements IClient {
  firstname: string
  lastname: string
  email: string
  phone: string
  zipcode: string
  newsletter: boolean
  birthdate: Date
  code: string

  constructor(params: IClient) {
    super(params)
    this.firstname = params.firstname
    this.lastname = params.lastname
    this.email = params.email
    this.phone = params.phone
    this.zipcode = params.zipcode
    this.newsletter = params.newsletter
    this.birthdate = new Date(params.birthdate)
    this.code = params.code
  }

  get fullName(): string {
    return `${this.lastname} ${this.firstname}`
  }
}
