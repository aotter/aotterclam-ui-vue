<template>
  <BaseForm
    ref="form"
    :value="value"
    :fields="fields"
    :field-layout-component="fieldLayout"
    :field-content-component="fieldContent"
    :array-content-component="arrayContent"
    @input="$emit('input', $event)"
    @submit="onSubmit"
  >
    <slot>
      <!-- default submit button -->
      <button class="btn btn-primary offset-sm-2">Submit</button>
    </slot>
  </BaseForm>
</template>
<script lang="ts">
import Vue from "vue";
import BaseForm from "../core/BaseForm.vue";
import FormGroup from "./FormGroup.vue";
import ClamFormField from "./ClamFormField.vue";
import ClamFormArray from "./ClamFormArray.vue";

export default Vue.extend({
  components: {
    BaseForm,
  },
  props: {
    fieldLayoutComponent: [String, Object, Function, Promise],
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
    fieldContent() {
      // do not allow override the whole component
      return ClamFormField;
    },
    arrayContent() {
      return ClamFormArray;
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