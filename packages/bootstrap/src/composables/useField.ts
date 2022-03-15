import { PropType } from '@vue/composition-api'
import { ValidationFlags } from 'vee-validate/dist/types/types'

export const withProps = () => ({
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    disabled: false
  },
  validationContext: {
    type: Object as PropType<ValidationFlags>,
    default: () => {}
  }
})

export const useField = () => {
  function getValidationClass({ dirty, validated, valid }: ValidationFlags) {
    return dirty || validated ? (valid ? 'is-valid' : 'is-invalid') : ''
  }

  return {
    getValidationClass
  }
}
