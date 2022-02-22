<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-checkbox
      switch
      :checked="value"
      @input="onInput"
      size="lg"
      :readonly="readonly"
      :disabled="disabled"
      :state="getValidationState(validationContext)"
    ></b-form-checkbox>
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
    value: Boolean,
    field: {
      type: Object as () =>
        | IInputStringClamFormField
        | IInputNumberClamFormField,
      required: true,
      validator: (value: IDefaultClamFormField) => {
        return value.formTagType === "SWITCH";
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
    onInput(value: boolean) {
      this.$emit("input", value);
    },
  },
});
</script>
