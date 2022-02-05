<template>
  <div class="form-group row">
    <label for="" class="col-sm-2 col-form-label text-md-right"
      ><span class="ml-1 text-danger">*</span> ddd</label
    >
    <div class="col-sm-10">
      <slot></slot>
      <small class="form-text text-muted">ddw</small>
      <div class="invalid-feedback" v-text="validationContext.errors[0]"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    validationContext: Object,
  },
  computed: {},
});
</script>
