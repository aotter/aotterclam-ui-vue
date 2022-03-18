<template>
  <component
    :is="component"
    :value="value"
    :field="field"
    :field-layout-component="fieldLayoutComponent"
    :field-content-component="fieldContentComponent"
    :readonly="readonly"
    :disabled="disabled"
    :validation-context="validationContext"
    @input="$emit('input', $event)"
  />
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { IClamField } from '../types'

import Input from './components/Input.vue'
import NestedList from './components/NestedList.vue'
import NestedObject from './components/NestedObject.vue'
import { withProps } from './composables/useField'

export default defineComponent({
  components: {
    Input,
    NestedList,
    NestedObject
  },
  props: {
    ...withProps(),
    fieldLayoutComponent: [String, Object, Function, Promise], // this will prevent circular reference
    fieldContentComponent: [String, Object, Function, Promise], // this will prevent circular reference
    value: [String, Number, Boolean, Object, Array, InputEvent],
    field: {
      type: Object as PropType<IClamField>,
      required: true
    }
  },
  setup(props) {
    const component = computed(() => props.field.component)

    return {
      component
    }
  }
})
</script>
