<template>
  <div class="form-group row">
    <label for="" class="col-sm-2 col-form-label text-md-right"
      ><span v-if="required" class="ml-1 text-danger">*</span>
      {{ label }}</label
    >
    <div class="col-sm-10">
      <slot></slot>
      <small class="form-text text-muted">{{ description }}</small>
      <div class="invalid-feedback" v-text="validationContext.errors[0]"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamField } from "./types";

export default Vue.extend({
  props: {
    validationContext: Object,
    field: Object,
  },
  computed: {
    label() {
      const field = this.field as IClamField;
      return field.label || field.name;
    },
    description() {
      const field = this.field as IClamField;
      return field.description;
    },
    required() {
      const field = this.field as IClamField;
      return field.rules?.includes("required");
    },
  },
});
</script>
