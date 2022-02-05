<template>
  <BaseForm
    ref="form"
    :value="value"
    :fields="fields"
    :fieldLayoutComponent="fieldLayout"
    @input="$emit('input', $event)"
    @submit="onSubmit"
  >
    <slot>
      <button class="btn btn-primary">Submit</button>
    </slot>
  </BaseForm>
</template>
<script lang="ts">
import Vue from "vue";
import BaseForm from "../core/BaseForm.vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    BaseForm,
  },
  props: {
    fieldLayoutComponent: [Object, Function, Promise],
    value: {
      type: Object,
    },
    fields: {
      type: Array,
    },
  },
  computed: {
    fieldLayout() {
      return this.fieldLayoutComponent ?? FormGroup;
    },
  },
  methods: {
    submit() {
      (this.$refs["form"] as any).submit();
    },
    onSubmit() {
      this.$emit("submit");
    },
  },
});
</script>