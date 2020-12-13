<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-input
      id=""
      :type="_type"
      :value="value"
      @input="onInput"
      :state="getValidationState(validationContext)"
      :placeholder="_placeholder"
    ></b-form-input>
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";
import { BFormInput } from "bootstrap-vue";

export default Vue.extend({
  components: {
    FormGroup,
    BFormInput,
  },
  props: [
    "value",
    "field",
    "type",
    "placeholder",
    "label",
    "rules",
    "description",
    "labelCols",
    "labelColsSm",
    "labelColsMd",
    "labelColsLg",
    "labelColsXl",
    "labelAlign",
    "labelAlignSm",
    "labelAlignMd",
    "labelAlignLg",
    "labelAlignXl",
  ],
  computed: {
    _type(): string {
      return this.field
        ? this.field?.contentType === "string"
          ? "text"
          : this.field?.contentType
        : this.type || "text";
    },
    _placeholder(): string | null {
      return this.field?.placeholder || this.placeholder;
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
      const v = this._type === "number" ? new Number(value).valueOf() : value;
      this.$emit("input", v);
    },
  },
});
</script>
