<template>
  <ValidationProvider
    slim
    :name="field.name"
    :rules="field.rules"
    v-slot="validationContext"
  >
    <component :is="layoutComponent" :validation-context="validationContext">
      <slot
        v-bind="{
          validationContext,
          fieldValue,
          show,
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
    layoutComponent: [Object, Function, Promise],
    value: [Object, Array],
    field: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fieldValue(): string | null {
      const field = this.field as IBaseClamField;
      return this.value && this.value[field.name]
        ? this.value[field.name]
        : null;
    },
    show(): boolean {
      const field = this.field as IBaseClamField;
      return this.determine(field.show);
    },
    readonly(): boolean {
      const field = this.field as IBaseClamField;
      return this.determine(field.readonly);
    },
    disabled(): boolean {
      const field = this.field as IBaseClamField;
      return this.determine(field.disabled);
    },
  },
  methods: {
    determine(f: Function | boolean | undefined): boolean {
      return f instanceof Function ? f(this.value) || false : f ?? false;
    },
  },
});
</script>