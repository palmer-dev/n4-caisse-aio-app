export type Label<T> = {
  label: string
  value: T
}

export interface HasLabel<T> {
  get label(): Label<T>
}
