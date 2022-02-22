<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <textarea
      :class="['form-control', getValidationClass(validationContext)]"
      rows="3"
      max-rows="6"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
      @input="onInput($event.target.value)"
      :placeholder="field.placeholder"
    ></textarea>
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField, IDefaultClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
  },
  props: {
    value: String,
    field: {
      type: Object as () => IDefaultClamFormField,
      required: true,
      validator: (value: IDefaultClamFormField) => {
        return value.formTagType === "TEXTAREA";
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
    onInput(value: string) {
      this.$emit("input", value);
    },
  },
});
</script>
