import { IModel } from '@models/Model.ts'
import { IShop } from '@services/shops/types.js'
import { IUser } from '../users/types.ts'
import { ICartState } from '@services/carts/types.js'
import { PaymentMethod } from '@renderer/components/ProductList/types.ts'
import { MSale } from '@renderer/data/models/Sale/MSale.ts'

export interface ISale extends IModel {
  shop?: IShop
  discount: number
  sub_total: number
  grand_total: number
  employee?: IUser
  client?: IUser
  created_at: Date
}

export type TaxBreakdown = {
  [rate: string]: number // ou `${number}` si tu veux forcer des pourcentages
}

export interface ISimulation {
  subtotal: number
  tax: number
  grand_total: number
  tax_breakdown: TaxBreakdown
  discount: number
}

export interface IAddSale extends ICartState {
  payment_method: PaymentMethod
}

export interface ISaleState {
  sale_id: string | null
  sale: MSale | null
}
