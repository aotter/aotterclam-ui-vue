<template>
  <div>
    <template v-for="field in fields">
      <template v-if="field.fields && field.fields.length > 0">
        <b-form-group
          :key="field.name"
          :label="field.label"
          label-for=""
          :label-cols="labelCols"
          :label-cols-sm="labelColsSm"
          :label-cols-md="labelColsMd"
          :label-cols-lg="labelColsLg"
          :label-cols-xl="labelColsXl"
          :label-align="labelAlign"
          :label-align-sm="labelAlignSm"
          :label-align-md="labelAlignMd"
          :label-align-lg="labelAlignLg"
          :label-align-xl="labelAlignXl"
          :description="field.description"
        >
          <template v-if="field.contentType === 'Object'">
            <FieldSetNested
              v-bind="$props"
              :key="field.name"
              :field="field"
              :value="getFormDataValue(field)"
              @input="onInput($event, field.name)"
            />
          </template>
          <template v-else-if="field.contentType === 'Array'">
            <FieldSetArray
              v-bind="$props"
              :key="field.name"
              :field="field"
              :value="getFormDataValue(field)"
              @input="onInput($event, field.name)"
            />
          </template>
        </b-form-group>
      </template>
      <template v-else>
        <component
          :is="`ClamForm_${field.formTagType}`"
          :key="field.name"
          v-if="determineShow(field)"
          v-bind="$props"
          :field="field"
          :value="getFormDataValue(field)"
          @input="onInput($event, field.name)"
        ></component>
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamFormField } from "../types";
import FieldSetNested from "./FieldSetNested.vue";
import FieldSetArray from "./FieldSetArray.vue";
import ClamForm_INPUT from "./ClamFormInput.vue";
import ClamForm_RADIO from "./ClamFormRadioGroup.vue";
import ClamForm_DATE from "./ClamFormDatePicker.vue";
import ClamForm_TEXTAREA from "./ClamFormTextArea.vue";
import ClamForm_CHECKBOXES from "./ClamFormCheckboxGroup.vue";
import ClamForm_SWITCH from "./ClamFormSwitch.vue";
import ClamForm_TAGS from "./ClamFormTag.vue";
import ClamForm_IMAGE from "./ClamFormCropImageUploader.vue";

import { BFormGroup } from "bootstrap-vue";

export default Vue.extend({
  components: {
    BFormGroup,
    FieldSetNested,
    FieldSetArray,
    ClamForm_INPUT,
    ClamForm_RADIO,
    ClamForm_DATE,
    ClamForm_TEXTAREA,
    ClamForm_CHECKBOXES,
    ClamForm_SWITCH,
    ClamForm_TAGS,
    ClamForm_IMAGE,
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
  methods: {
    determineShow(field: IClamFormField) {
      return field.showIf ? field.showIf(this.value) : true;
    },
    getFormDataValue(field: IClamFormField) {
      const defaultValue =
        field.contentType === "Object"
          ? {}
          : field.contentType === "Array"
          ? []
          : null;

      return this.value && this.value[field.name]
        ? this.value[field.name]
        : defaultValue;
    },
    onInput(value: any, name: string) {
      this.$emit("input", { ...this.value, [name]: value });
    },
  },
});
</script>
