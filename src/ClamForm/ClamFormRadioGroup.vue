<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-radio-group
      :checked="value"
      @input="onInput"
      :options="_options"
      :state="getValidationState(validationContext)"
    ></b-form-radio-group>
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";
import { BFormRadioGroup } from "bootstrap-vue";

export default Vue.extend({
  components: {
    FormGroup,
    BFormRadioGroup,
  },
  // TODO: type should be text or number
  props: [
    "value",
    "field",
    "type",
    "options",
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
    _type() {
      return this.field
        ? this.field?.contentType === "string"
          ? "text"
          : "number"
        : this.type || "text";
    },
    _options() {
      return this.field?.options || this.options;
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
      const v = this.type === "number" ? new Number(value).valueOf() : value;
      this.$emit("input", v);
    },
  },
});
</script>
