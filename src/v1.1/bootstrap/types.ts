import { IBaseClamField } from "../core/types";

export interface IMetaClamField extends IBaseClamField {
    label?: string
    description?: string
    placeholder?: string
}

export interface IArrayClamField extends IMetaClamField {
    component: 'LIST'
    getTitle?: (data: any, index?: number) => string
    settings?: {
        create?: ButtonSetting
        modal?: ModalSetting
    }
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

export interface IObjectClamField extends IMetaClamField {
    component: 'OBJECT'
    settings?: {
        textVariant?: string
        bgVariant?: string
        borderVariant?: string
    }
}

export interface IInputStringClamField extends IMetaClamField {
    component: 'INPUT'
    inputTagType?: 'text' | 'password' | 'email' | 'url' | 'color' | 'tel' | 'search'
    inputTagAttrs?: {
        maxlength?: number
    }
}

export interface IInputNumberClamField extends IMetaClamField {
    component: 'INPUT'
    inputTagType: 'number' | 'range'
    inputTagAttrs?: {
        min?: number
        max?: number
        step?: number
    }
}

export interface ICheckboxClamField extends IMetaClamField {
    component: 'INPUT'
    contentType: 'boolean'
    inputTagType: 'checkbox'
}

export interface ICheckboxGroupClamField extends IMetaClamField {
    component: 'INPUT'
    contentType: 'string[]' | 'number[]'
    inputTagType: 'checkbox',
    options: Option[]
}

export interface IRadioGroupClamField extends IMetaClamField {
    component: 'INPUT'
    contentType: 'string' | 'number'
    inputTagType: 'radio',
    options: Option[]
}

interface Option {
    text: string
    value: string | number
}

export type IClamField = IArrayClamField | IObjectClamField | IInputStringClamField | IInputNumberClamField | ICheckboxClamField | ICheckboxGroupClamField | IRadioGroupClamField
