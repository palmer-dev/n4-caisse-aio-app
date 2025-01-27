import { IModel } from '@models/Model'

export interface IUser extends IModel {
  email: string
  firstname: string
  lastname: string
}
