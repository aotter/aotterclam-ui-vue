<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-datepicker
      :value="value"
      @input="onInput"
      locale="zh"
      :state="getValidationState(validationContext)"
    ></b-form-datepicker>
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";
import { BFormDatepicker } from "bootstrap-vue";

export default Vue.extend({
  components: {
    FormGroup,
    BFormDatepicker,
  },
  // TODO: min max
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
  computed: {},
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
    onInput(value: string) {
      this.$emit("input", value);
    },
  },
});
</script>
