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
          disabled,
        }"
      ></slot>
    </component>
  </ValidationProvider>
</template>
<script lang="ts">
import Vue from "vue";
import { IBaseClamField } from "../core/types";
export default Vue.extend({
  props: {
    layoutComponent: [String, Object, Function, Promise],
    value: [Object, Array],
    field: {
      type: Object,
      required: true,
    },
  },
  computed: {
    clamField(): IBaseClamField {
      return this.field as IBaseClamField;
    },
    fieldValue(): string | null {
      return this.value && this.value[this.clamField.name]
        ? this.value[this.clamField.name]
        : null;
    },
    show(): boolean {
      return this.clamField.show ? this.determine(this.clamField.show) : true;
    },
    readonly(): boolean {
      return this.determine(this.clamField.readonly);
    },
    disabled(): boolean {
      return this.determine(this.clamField.disabled);
    },
  },
  methods: {
    determine(f: Function | boolean | undefined): boolean {
      return f instanceof Function ? f(this.value) || false : f ?? false;
    },
  },
});
</script>