<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <input 
      :class="['form-control', getValidationClass(validationContext)]" 
      :type="_type"
      :value="value"
      @input="onInput($event.target.value)"
      :placeholder="_placeholder"
    >
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
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
    getValidationClass({
      dirty,
      validated,
      valid,
    }: {
      dirty: boolean;
      validated: boolean;
      valid: boolean;
    }) {
      return dirty || validated ? valid ? 'is-valid' : 'is-invalid' : '';
    },
    onInput(value: any) {
      console.log(value)
      const v = this._type === "number" ? new Number(value).valueOf() : value;
      this.$emit("input", v);
    },
  },
});
</script>
