import { IModel } from '@models/Model.ts'

export interface IUser extends IModel {
  email: string
  firstname: string
  lastname: string
}
