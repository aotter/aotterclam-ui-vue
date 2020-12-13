<template>
  <ValidationProvider :name="_label" :rules="_rules" v-slot="validationContext">
    <b-form-group
      label-for=""
      :label-cols="labelCols"
      :label-cols-sm="labelColsSm"
      :label-cols-md="labelColsMd"
      :label-cols-lg="labelColsLg"
      :label-cols-xl="labelColsXl"
      :label-align="labelAlign"
      :label-align-sm="labelAlignSm"
      :label-align-md="labelAlignMd"
      :label-align-lg="labelAlignLg"
      :label-align-xl="labelAlignXl"
      :description="_description"
    >
      <template v-slot:label>
        <span v-if="required" class="ml-1 text-danger">*</span> {{ _label }}
      </template>
      <slot v-bind="validationContext"></slot>
      <b-form-invalid-feedback>{{
        validationContext.errors[0]
      }}</b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamFormField } from "../types";
import { BFormGroup, BFormInvalidFeedback } from "bootstrap-vue";

export default Vue.extend({
  components: {
    BFormGroup,
    BFormInvalidFeedback,
  },
  props: [
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
  computed: {
    _label(): string {
      const field = this.field as IClamFormField;
      return field?.label || this.label;
    },
    _rules(): string {
      const field = this.field as IClamFormField;
      return field?.rules || this.rules;
    },
    _description(): string {
      const field = this.field as IClamFormField;
      return field?.description || this.description;
    },
    required() {
      const _rules = this._rules as string;
      return _rules?.includes("required");
    },
  },
});
</script>
