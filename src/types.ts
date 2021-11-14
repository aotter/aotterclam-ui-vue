
export type ClamFormFieldContentType = 'string' | 'number' | 'boolean' | 'Object' | 'Array' | null

interface IBaseClamFormField {
  name: string
  component?: string
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

export interface IArrayClamFormField extends IBaseClamFormField {
  formTagType: null,
  contentType: 'Array',
  getTitle?: (data: any) => string,
  settings?: {
    modalSize?: 'xl' | 'lg' | 'sm'
  }
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
    uploadFunction: (form: FormData) => Promise<string>
  }
}

export type IClamFormField = IOptionsClamFormField | IInputStringClamFormField | IInputNumberClamFormField | IDefaultClamFormField | IImageClamFormField | IArrayClamFormField
