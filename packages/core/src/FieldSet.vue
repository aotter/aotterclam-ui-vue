<template>
  <div>
    <template v-for="field in fields">
      <Field
        :key="field.name"
        :field="field"
        :value="value"
        :layout-component="fieldLayoutComponent"
        v-slot="{
          validationContext,
          fieldValue,
          readonly: fieldReadonly,
          disabled: fieldDisabled
        }"
      >
        <component
          v-if="fieldContentComponent"
          :is="fieldContentComponent"
          :field="field"
          :value="fieldValue"
          :field-layout-component="fieldLayoutComponent"
          :field-content-component="fieldContentComponent"
          :validation-context="validationContext"
          :readonly="determineReadOnly(fieldReadonly)"
          :disabled="determineDisabled(fieldDisabled)"
          @input="onInput($event, field)"
        />
        <span v-else>
          Missing fieldContentComponent for field {{ field.name }}
        </span>
      </Field>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Field from './Field.vue'
import { IBaseClamField } from '../types'

export default defineComponent({
  name: 'FieldSet',
  components: {
    Field
  },
  props: {
    readonly: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    fieldLayoutComponent: [String, Object, Function, Promise],
    fieldContentComponent: [String, Object, Function, Promise],
    value: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Array
    }
  },
  setup(props, ctx) {
    function onInput(value: any, field: IBaseClamField) {
      ctx.emit('input', { ...props.value, [field.name]: value })
    }

    function determineReadOnly(fieldReadonly: boolean): boolean {
      return props.readonly ?? fieldReadonly
    }

    function determineDisabled(fieldDisabled: boolean): boolean {
      return props.disabled ?? fieldDisabled
    }

    return {
      onInput,
      determineReadOnly,
      determineDisabled
    }
  }
})
</script>
