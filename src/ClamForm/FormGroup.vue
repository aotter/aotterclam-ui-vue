<template>
  <ValidationProvider :name="_label" :rules="_rules" v-slot="validationContext">
    <div class="form-group row">
      <label for="" class="col-sm-2 col-form-label text-md-right"
        ><span v-if="required" class="ml-1 text-danger">*</span>
        {{ _label }}</label
      >
      <div class="col-sm-10">
        <slot v-bind="validationContext"></slot>
        <small class="form-text text-muted" v-text="_description"></small>
        <div
          class="invalid-feedback"
          v-text="validationContext.errors[0]"
        ></div>
      </div>
    </div>
  </ValidationProvider>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamFormField } from "../types";

export default Vue.extend({
  props: {
    field: {
      type: Object as () => IClamFormField,
    },
    label: {
      type: String,
    },
    rules: {
      type: String,
    },
    description: {
      type: String,
    },
  },
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
