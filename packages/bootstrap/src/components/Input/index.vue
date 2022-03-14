<template>
  <component
    :is="component"
    :value="value"
    :field="field"
    :readonly="readonly"
    :disabled="disabled"
    :validation-context="validationContext"
    @input="$emit('input', $event)"
  />
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import BasicInput from './BasicInput.vue'
import { FieldMixin } from '../mixins'
import { IInputClamField } from '../../../types'

export default defineComponent({
  mixins: [FieldMixin],
  components: {
    BasicInput
  },
  props: {
    value: [String, Number],
    field: {
      type: Object as PropType<IInputClamField>,
      required: true
    }
  },
  setup(props) {
    const component = computed(() => {
      switch (props.field.inputTagType) {
        case 'checkbox':
          if (props.field.contentType === 'boolean') {
            return 'Checkbox'
          } else {
            return 'CheckboxGroup'
          }
        case 'radio':
          return 'RadioGroup'
        default:
          return 'BasicInput'
      }
    })

    return {
      component
    }
  }
})
</script>
