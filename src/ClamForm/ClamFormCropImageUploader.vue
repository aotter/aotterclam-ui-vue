<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <CropImageUploader
      :value="value"
      @input="onInput"
      v-bind="_settings"
      :state="getValidationState(validationContext)"
    />
  </FormGroup>
</template>
<script lang="ts">
import { IClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";
import CropImageUploader from "../CustomInput/CropImageUploader.vue";

export default Vue.extend({
  components: {
    CropImageUploader,
    FormGroup,
  },
  props: [
    "value",
    "field",
    "settings",
    "type",
    "placeholder",
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
    _settings() {
      return this.field?.settings || this.settings;
    },
  },
  methods: {
    getValidationState({
      dirty,
      validated,
      valid,
    }: {
      dirty: boolean;
      validated: boolean;
      valid: boolean;
    }) {
      return dirty || validated ? valid : null;
    },
    onInput(value: string) {
      this.$emit("input", value);
    },
  },
});
</script>
