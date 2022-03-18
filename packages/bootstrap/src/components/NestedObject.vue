<template>
  <div
    :class="[
      'card',
      textVariant ? `text-${textVariant}` : '',
      bgVariant ? `bg-${bgVariant}` : '',
      borderVariant ? `border-${borderVariant}` : ''
    ]"
  >
    <div class="card-body">
      <FieldSet
        :fields="field.fields"
        :value="value"
        :readonly="readonly"
        :disabled="disabled"
        :field-layout-component="fieldLayoutComponent"
        :field-content-component="fieldContentComponent"
        @input="$emit('input', $event)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { FieldSet } from '@aotter/aotterclam-ui-vue-core'
import { withProps } from '../composables/useField'
import { IObjectClamField } from '../../types'

export default defineComponent({
  name: 'NestedObject',
  components: { FieldSet },
  props: {
    ...withProps(),
    fieldLayoutComponent: [String, Object, Function, Promise], // this will prevent circular reference
    fieldContentComponent: [String, Object, Function, Promise], // this will prevent circular reference
    value: Object,
    field: {
      type: Object as PropType<IObjectClamField>,
      required: true
    }
  },
  setup(props) {
    const textVariant = computed(() => props.field.settings?.textVariant)
    const bgVariant = computed(() => props.field.settings?.bgVariant)
    const borderVariant = computed(() => props.field.settings?.borderVariant)

    return {
      textVariant,
      bgVariant,
      borderVariant
    }
  }
})
</script>
