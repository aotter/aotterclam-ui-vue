<template>
  <input
    v-bind="field.inputTagAttrs"
    :class="['form-control', getValidationClass(validationContext)]"
    :type="type"
    :value="value"
    :readonly="readonly"
    :disabled="disabled"
    @input="onInput($event.target.value)"
    :placeholder="field.placeholder"
  />
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { IInputStringClamField, IInputNumberClamField } from '../../types'
import { withProps, useField } from '../composables/useField'

export default defineComponent({
  props: {
    ...withProps(),
    value: [String, Number],
    field: {
      type: Object as PropType<IInputStringClamField | IInputNumberClamField>,
      required: true
    }
  },
  setup(props, ctx) {
    const { getValidationClass } = useField()

    // only 'number' and 'string' are possible values here
    const type = computed(() =>
      props.field.contentType === 'number' ? 'number' : 'text'
    )

    function onInput(value: number | string | undefined) {
      const v = type.value === 'number' ? new Number(value).valueOf() : value
      ctx.emit('input', v)
    }

    return {
      type,
      onInput,
      getValidationClass
    }
  }
})
</script>
