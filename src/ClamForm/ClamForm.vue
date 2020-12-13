<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <FieldSet
        v-if="fields && fields.length > 0"
        v-bind="$props"
        @input="$emit('input', $event)"
      />
      <slot></slot>
      <button ref="submitbtn" type="submit" style="display: none"></button>
    </b-form>
  </ValidationObserver>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamFormField } from "../types";
import FieldSet from "./FieldSet.vue";
import { BForm } from "bootstrap-vue";
// fixme: i dont think this it the right way to init vee-validate
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
    BForm,
    FieldSet,
  },
  props: [
    "value",
    "fields",
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
  // props: {
  //   value: {
  //     type: Object,
  //   },
  //   fields: {
  //     type: Array,
  //   },
  //   labelCols: {
  //     type: String,
  //   },
  //   labelColsSm: {
  //     type: String,
  //   },
  //   labelColsMd: {
  //     type: String,
  //   },
  //   labelColsLg: {
  //     type: String,
  //   },
  //   labelColsXl: {
  //     type: String,
  //   },
  //   labelAlign: {
  //     type: String,
  //   },
  //   labelAlignSm: {
  //     type: String,
  //   },
  //   labelAlignMd: {
  //     type: String,
  //   },
  //   labelAlignLg: {
  //     type: String,
  //   },
  //   labelAlignXl: {
  //     type: String,
  //   },
  // },
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
