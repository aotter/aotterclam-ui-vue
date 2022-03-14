import { IBaseClamField } from '@aotter/aotterclam-ui-vue-core/types'

export interface IMetaClamField extends IBaseClamField {
  label?: string
  description?: string
  placeholder?: string
}

export interface IArrayClamField extends IMetaClamField {
  component: 'NestedInput'
  getTitle?: (data: any, index?: number) => string
  settings?: {
    create?: ButtonSetting
    modal?: ModalSetting
  }
}

export interface IObjectClamField extends IMetaClamField {
  component: 'NestedObject'
  settings?: {
    textVariant?: string
    bgVariant?: string
    borderVariant?: string
  }
}

export interface IInputStringClamField extends IMetaClamField {
  component: 'Input'
  contentType: 'string'
  inputTagType?:
    | 'text'
    | 'password'
    | 'email'
    | 'url'
    | 'color'
    | 'tel'
    | 'search'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'time'
    | 'week'
  inputTagAttrs?: {
    maxlength?: number
  }
}

export interface IInputNumberClamField extends IMetaClamField {
  component: 'Input'
  contentType: 'number'
  inputTagType: 'number' | 'range'
  inputTagAttrs?: {
    min?: number
    max?: number
    step?: number
  }
}

export interface ICheckboxClamField extends IMetaClamField {
  component: 'Input'
  contentType: 'boolean'
  inputTagType: 'checkbox'
}

export interface ICheckboxGroupClamField extends IMetaClamField {
  component: 'Input'
  contentType: 'string[]' | 'number[]'
  inputTagType: 'checkbox'
  options: Option[]
}

export interface IRadioGroupClamField extends IMetaClamField {
  component: 'Input'
  contentType: 'string' | 'number'
  inputTagType: 'radio'
  options: Option[]
}

export type IInputClamField =
  | IInputStringClamField
  | IInputNumberClamField
  | ICheckboxClamField
  | ICheckboxGroupClamField
  | IRadioGroupClamField

export interface ISelectClamField extends IMetaClamField {
  component: 'SELECT'
  contentType: 'string' | 'number'
  options: Option[]
}

export interface ITextAreaClamField extends IMetaClamField {
  component: 'TEXTAREA'
  contentType: 'string'
}

export type IClamField =
  | IArrayClamField
  | IObjectClamField
  | IInputClamField
  | ISelectClamField
  | ITextAreaClamField

interface Option {
  text: string
  value: string | number
}

export interface ModalSetting {
  titleCreate?: string
  titleUpdate?: string | ((data: any, index?: number) => string)
  size?: 'xl' | 'lg' | 'md' | 'sm'
  ok: ButtonSetting
  cancel: ButtonSetting
}

export interface ButtonSetting {
  title?: string
  titleHtml?: string
  variant?: string
  size?: 'lg' | 'sm'
}
