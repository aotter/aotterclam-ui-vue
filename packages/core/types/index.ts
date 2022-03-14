export type ClamFieldContentType =
  | 'Object'
  | 'Array'
  | 'string'
  | 'string[]'
  | 'number'
  | 'number[]'
  | 'boolean'

export type ClamComponentType =
  | 'INPUT'
  | 'SELECT'
  | 'TEXTAREA'
  | string
  | Function // to be put in :is attr of <component />

export interface IBaseClamField {
  name: string
  component: ClamComponentType
  contentType: ClamFieldContentType
  show?: boolean | ((data: any) => boolean)
  readonly?: boolean | ((data: any) => boolean)
  disabled?: boolean | ((data: any) => boolean)
  rules?: string // vee-validate rules
  fields?: any[] // fixme: anything that extends IBaseClamField can be put here
}
