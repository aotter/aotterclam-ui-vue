<template>
  <ValidationProvider
    v-if="show"
    :name="field.name"
    :rules="field.rules"
    v-slot="validationContext"
    slim
  >
    <component
      :is="layoutComponent"
      :validation-context="validationContext"
      :field="field"
    >
      <slot
        v-bind="{
          validationContext,
          fieldValue,
          readonly,
          disabled
        }"
      ></slot>
    </component>
  </ValidationProvider>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Data } from '@vue/composition-api'
import { IBaseClamField } from '../types'

export default defineComponent({
  props: {
    layoutComponent: {
      type: [String, Object, Function, Promise]
    },
    value: {
      type: Object as PropType<Data>,
      default: {}
    },
    field: {
      type: Object as PropType<IBaseClamField>,
      required: true
    }
  },
  setup(props, ctx) {
    const fieldValue = computed(() => {
      return props.value && props.value[props.field.name]
        ? props.value[props.field.name]
        : null
    })

    const show = computed(() =>
      props.field.show ? determine(props.field.show) : true
    )
    const readonly = computed(() => determine(props.field.readonly))
    const disabled = computed(() => determine(props.field.disabled))

    function determine(f: Function | boolean | undefined): boolean {
      return f instanceof Function ? f(props.value) || false : f ?? false
    }

    return {
      fieldValue,
      show,
      readonly,
      disabled
    }
  }
})
</script>
