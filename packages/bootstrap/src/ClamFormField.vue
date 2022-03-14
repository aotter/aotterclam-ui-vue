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
import { FieldMixin } from './components/mixins'
import { IClamField } from '../types'

import Input from './components/Input/index.vue'
import NextedList from './components/nested/List.vue'
import NestedObject from './components/nested/Object.vue'

export default defineComponent({
  mixins: [FieldMixin],
  components: {
    Input,
    NextedList,
    NestedObject
  },
  props: {
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
