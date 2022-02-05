<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form @submit.prevent="handleSubmit(onSubmit)">
      <FieldSet
        v-if="fields && fields.length > 0"
        :fields="fields"
        :value="value"
        :fieldLayoutComponent="fieldLayoutComponent"
        @input="$emit('input', $event)"
      />
      <slot></slot>
      <button ref="submitbtn" type="submit" style="display: none"></button>
    </form>
  </ValidationObserver>
</template>
<script lang="ts">
import Vue from "vue";
import FieldSet from "./FieldSet.vue";

export default Vue.extend({
  components: {
    FieldSet,
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
  methods: {
    submit() {
      // a small hack to invoke handleSubmit function of ValidationObserver
      // otherwise submit the form directly will bypass ValidationObserver check
      (this.$refs["submitbtn"] as any).click();
    },
    onSubmit() {
      this.$emit("submit");
    },
  },
});
</script>