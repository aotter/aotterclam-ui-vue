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
import Vue, { PropType } from "vue";
import { IClamField } from "./types";

export default Vue.extend({
  props: {
    validationContext: Object,
    field: {
      type: Object as PropType<IClamField>,
      required: true,
    },
  },
  computed: {
    label(): string {
      return this.field.label || this.field.name;
    },
    description(): string | undefined {
      return this.field.description;
    },
    required(): boolean | undefined {
      return this.field.rules?.includes("required");
    },
  },
});
</script>
