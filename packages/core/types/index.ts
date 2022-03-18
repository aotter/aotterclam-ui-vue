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
  | (() => void) // to be put in :is attr of <component />

export interface IBaseClamField {
  name: string
  component: ClamComponentType
  contentType: ClamFieldContentType
  show?: BaseClamFieldBoolean
  readonly?: BaseClamFieldBoolean
  disabled?: BaseClamFieldBoolean
  rules?: string // vee-validate rules
  fields?: any[] // fixme: anything that extends IBaseClamField can be put here
}

export type BaseClamFieldBoolean = boolean | ((data: any) => boolean)
