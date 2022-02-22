<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <input
      v-bind="field.inputTagAttrs"
      :class="['form-control', getValidationClass(validationContext)]"
      :type="_type"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
      @input="onInput($event.target.value)"
      :placeholder="field.placeholder"
    />
  </FormGroup>
</template>
<script lang="ts">
import { IInputNumberClamFormField, IInputStringClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
  },
  props: {
    value: [String, Number],
    field: {
      type: Object as () =>
        | IInputStringClamFormField
        | IInputNumberClamFormField,
      required: true,
      validator: (
        value: IInputStringClamFormField | IInputNumberClamFormField
      ) => {
        return value.formTagType === "INPUT";
      },
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _type() {
      if (this.field.inputTagType != null) {
        return this.field.inputTagType;
      } else {
        return this.field.contentType === "number" ? "number" : "text";
      }
    },
  },
  methods: {
    getValidationClass({
      dirty,
      validated,
      valid,
    }: {
      dirty: boolean;
      validated: boolean;
      valid: boolean;
    }) {
      return dirty || validated ? (valid ? "is-valid" : "is-invalid") : "";
    },
    onInput(value: any) {
      const v =
        this.field.contentType === "number"
          ? new Number(value).valueOf()
          : value;
      this.$emit("input", v);
    },
  },
});
</script>
