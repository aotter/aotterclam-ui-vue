<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <FieldSet
        v-if="fields && fields.length > 0"
        v-bind="$props"
        @input="$emit('input', $event)"
      />
       <slot></slot>
      <button ref="submitbtn" type="submit" style="display: none"></button>
    </form>
  </ValidationObserver>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamFormField } from "../types";
import FieldSet from "./FieldSet.vue";
// fixme: i dont think this it the right way to init vee-validate
// fixme: support i18n error messages
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach((rule) => {
  const _rules = rules as any;
  extend(rule, _rules[rule]);
});
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

export default Vue.extend({
  components: {
    FieldSet,
  },
  props:{
    value: {
      type: Object,
    },
    fields: {
      type: Array as () => IClamFormField[],
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
