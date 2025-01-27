export type IResponse<DataType> = {
  ok: boolean
} & Record<'data', DataType>

export type IAuthResponse<DataType> = {
  ok: boolean
} & Record<'data', DataType>
