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
          disabled: fieldDisabled,
        }"
      >
        <component
          v-if="fieldContentComponent"
          :is="fieldContentComponent"
          :field="field"
          :value="fieldValue"
          :validation-context="validationContext"
          :readonly="determineReadOnly(fieldReadonly)"
          :disabled="determineDisabled(fieldDisabled)"
          @input="onInput($event, field)"
        />
        <span v-else
          >Missing fieldContentComponent for field {{ field.name }}</span
        >
      </Field>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Field from "./Field.vue";
import { IBaseClamField } from "./types";

export default Vue.extend({
  name: "FieldSet",
  components: {
    Field,
  },
  props: {
    readonly: {
      type: Boolean,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: null,
    },
    fieldLayoutComponent: [String, Object, Function, Promise],
    fieldContentComponent: [String, Object, Function, Promise],
    value: [Object, Array],
    fields: {
      type: Array,
    },
  },
  methods: {
    onInput(value: any, field: IBaseClamField) {
      this.$emit("input", { ...this.value, [field.name]: value });
    },
    determineReadOnly(fieldReadonly: boolean): boolean {
      return this.readonly ?? fieldReadonly;
    },
    determineDisabled(fieldDisabled: boolean): boolean {
      return this.disabled ?? fieldDisabled;
    },
  },
});
</script>