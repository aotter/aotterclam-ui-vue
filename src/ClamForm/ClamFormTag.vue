<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-tags
      :value="value"
      @input="onInput"
      :placeholder="_placeholder"
      :state="getValidationState(validationContext)"
      remove-on-delete
    ></b-form-tags>
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";
import { BFormTags } from "bootstrap-vue";

export default Vue.extend({
  components: {
    FormGroup,
    BFormTags,
  },
  // TODO: check value should be an array, type should be text or number
  props: [
    "value",
    "field",
    "type",
    "options",
    "label",
    "rules",
    "placeholder",
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
    _placeholder() {
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
    onInput(value: any[]) {
      this.$emit("input", value);
    },
  },
});
</script>
