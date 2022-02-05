export interface IBaseClamField {
    name: string
    component: string
    show?: boolean | ((data: any) => boolean)
    readonly?: boolean | ((data: any) => boolean)
    disabled?: boolean | ((data: any) => boolean)
    rules?: string // vee-validate rules
    fields?: any[] // fixme: anything that extends IBaseClamField can be put here
}
