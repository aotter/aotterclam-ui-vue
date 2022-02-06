import { IBaseClamField } from "../core/types";

export interface IMetaClamField extends IBaseClamField {
    label?: string
    description?: string
    placeholder?: string
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
    inputTagType?: 'number' | 'range'
    inputTagAttrs?: {
        min?: number
        max?: number
        step?: number
    }
}



export type IClamField = IInputStringClamField | IInputNumberClamField
