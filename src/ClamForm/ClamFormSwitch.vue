<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-checkbox
      switch
      :checked="value"
      @input="onInput"
      size="lg"
      :state="getValidationState(validationContext)"
    ></b-form-checkbox>
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";
import { BFormCheckbox } from "bootstrap-vue";

export default Vue.extend({
  components: {
    FormGroup,
    BFormCheckbox,
  },
  // TODO check type must be boolean
  props: [
    "value",
    "field",
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
