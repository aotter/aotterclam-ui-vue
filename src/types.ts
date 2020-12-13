
export type ClamFormFieldContentType = 'string' | 'number' | 'boolean' | 'Object' | 'Array' | null

interface IBaseClamFormField {
  name: string
  label?: string
  contentType: ClamFormFieldContentType
  description?: string
  placeholder?: string
  showIf?: (data: any) => boolean
  rules?: string // vee-validate rules
  fields?: IClamFormField[] // nested fields
}

interface IOptionsClamFormField extends IBaseClamFormField {
  formTagType: 'SELECT' | 'RADIO' | 'CHECKBOXES'
  options?: {
    text: string
    value: string | number
  }[]
}

interface IDefaultClamFormField extends IBaseClamFormField {
  formTagType: 'INPUT' | 'DATE' | 'SWITCH' | 'DATETIME' | 'TAGS' | 'TEXTAREA'
}

interface IImageClamFormField extends IBaseClamFormField {
  formTagType: 'IMAGE'
  settings: {
    width: number
    height: number
    displayWidth: string
    acceptImageType: string
  }
}

export type IClamFormField = IOptionsClamFormField | IDefaultClamFormField | IImageClamFormField
