export const FieldMixin = {
    props: {
        readonly: Boolean,
        disabled: Boolean,
        validationContext: Object // vee-validate context
    },
    methods: {
        getValidationClass({
            dirty,
            validated,
            valid,
        }: {
            dirty: boolean;
            validated: boolean;
            valid: boolean;
        }) {
            return dirty || validated ? (valid ? "is-valid" : "is-invalid") : "";
        },
    }
}