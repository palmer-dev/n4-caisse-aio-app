import { IModel } from '@models/Model.ts'

export interface IClient extends IModel {
  firstname: string
  lastname: string
  email: string
  phone: string
  zipcode: string
  newsletter: boolean
  birthdate: Date
  code: string
}

export interface ISearchClient {
  firstname: string
  lastname: string
  zipcode?: string
}
