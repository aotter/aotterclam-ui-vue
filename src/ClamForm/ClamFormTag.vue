<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-tags
      :value="value"
      @input="onInput"
      :placeholder="field.placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :separator="[' ', ',', ';']"
      :state="getValidationState(validationContext)"
      remove-on-delete
    ></b-form-tags>
  </FormGroup>
</template>
<script lang="ts">
import {
  IDefaultClamFormField,
  IInputNumberClamFormField,
  IInputStringClamFormField,
} from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
  },
  props: {
    value: Array,
    field: {
      type: Object as () =>
        | IInputStringClamFormField
        | IInputNumberClamFormField,
      required: true,
      validator: (value: IDefaultClamFormField) => {
        return value.formTagType === "TAGS";
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
  methods: {
    getValidationState({
      dirty,
      validated,
      valid,
    }: {
      dirty: boolean;
      validated: boolean;
      valid: boolean;
    }) {
      return dirty || validated ? valid : null;
    },
    onInput(value: any[]) {
      this.$emit("input", value);
    },
  },
});
</script>
