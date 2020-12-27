
export type ClamFormFieldContentType = 'string' | 'number' | 'boolean' | 'Object' | 'Array' | null

interface IBaseClamFormField {
  name: string
  label?: string
  contentType: ClamFormFieldContentType
  description?: string
  placeholder?: string
  showIf?: (data: any) => boolean
  readonly?: boolean | ((data: any) => boolean)
  disabled?: boolean | ((data: any) => boolean)
  rules?: string // vee-validate rules
  fields?: IClamFormField[] // nested fields
}

export interface IDefaultClamFormField extends IBaseClamFormField {
  formTagType: 'DATE' | 'SWITCH' | 'TAGS' | 'TEXTAREA'
}

export interface IInputStringClamFormField extends IBaseClamFormField {
  formTagType: 'INPUT'
  inputTagType?: 'text' | 'password' | 'email' | 'url' | 'color' | 'tel' | 'search'
  inputTagAttrs?: {
    maxlength?: number
  }
}

export interface IInputNumberClamFormField extends IBaseClamFormField {
  formTagType: 'INPUT'
  inputTagType?: 'number' | 'range'
  inputTagAttrs?: {
    min?: number
    max?: number
    step?: number
  }
}

export interface IOptionsClamFormField extends IBaseClamFormField {
  formTagType: 'SELECT' | 'RADIO' | 'CHECKBOXES'
  options?: {
    text: string
    value: string | number
  }[]
}

export interface IImageClamFormField extends IBaseClamFormField {
  formTagType: 'IMAGE'
  settings: {
    width: number
    height: number
    displayWidth: string
    acceptImageType: string
  }
}

export type IClamFormField = IOptionsClamFormField | IInputStringClamFormField | IInputNumberClamFormField | IDefaultClamFormField | IImageClamFormField
