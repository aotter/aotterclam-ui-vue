<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-textarea
      id="textarea"
      :value="value"
      @input="onInput"
      :placeholder="_placeholder"
      rows="3"
      :state="getValidationState(validationContext)"
      max-rows="6"
    ></b-form-textarea>
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";
import { BFormTextarea } from "bootstrap-vue";

export default Vue.extend({
  components: {
    FormGroup,
    BFormTextarea,
  },
  props: [
    "value",
    "field",
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
    onInput(value: string) {
      this.$emit("input", value);
    },
  },
});
</script>
