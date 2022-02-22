<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-select
      :value="value"
      @input="onInput"
      :options="_options"
      :readonly="readonly"
      :disabled="disabled"
      :state="getValidationState(validationContext)"
    ></b-form-select>
  </FormGroup>
</template>
<script lang="ts">
import { IOptionsClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
  },
  props: {
    value: [String, Number],
    field: {
      type: Object as () => IOptionsClamFormField,
      required: true,
      validator: (value: IOptionsClamFormField) => {
        return value.formTagType === "SELECT";
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
    _options() {
      const opts = JSON.parse(JSON.stringify(this.field.options));
      opts.unshift({
        value: null,
        text: this.field?.placeholder ?? "請選擇...",
        disabled: true,
      });
      return opts;
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
