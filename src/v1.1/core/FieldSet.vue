<template>
  <div>
    <template v-for="field in fields">
      <Field
        :key="field.name"
        :field="field"
        :value="value"
        :layout-component="fieldLayoutComponent"
        v-slot="{ validationContext, fieldValue, readonly, disabled }"
      >
        <component
          v-if="fieldContentComponent"
          :is="fieldContentComponent"
          :field="field"
          :value="fieldValue"
          :validation-context="validationContext"
          :readonly="readonly"
          :disabled="disabled"
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
  },
});
</script>