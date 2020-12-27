<template>
  <div>
    <template v-for="field in fields">
      <template v-if="field.fields && field.fields.length > 0">
        <div class="form-group row" :key="field.name">
          <label
            for=""
            class="col-sm-2 col-form-label text-md-right"
            v-text="field.label"
          ></label>
          <div class="col-sm-10">
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
            <small
              class="form-text text-muted"
              v-text="field.description"
            ></small>
          </div>
        </div>
      </template>
      <template v-else>
        <component
          :is="`ClamForm_${field.formTagType}`"
          :key="field.name"
          v-if="determineShow(field)"
          v-bind="$props"
          :field="field"
          :readonly="determineReadonly(field)"
          :disabled="determineDisabled(field)"
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
//import ClamForm_DATE from "./ClamFormDatePicker.vue";
import ClamForm_TEXTAREA from "./ClamFormTextArea.vue";
import ClamForm_CHECKBOXES from "./ClamFormCheckboxGroup.vue";
//import ClamForm_SWITCH from "./ClamFormSwitch.vue";
//import ClamForm_TAGS from "./ClamFormTag.vue";
import ClamForm_IMAGE from "./ClamFormCropImageUploader.vue";

export default Vue.extend({
  components: {
    FieldSetNested,
    FieldSetArray,
    ClamForm_INPUT,
    ClamForm_RADIO,
    //ClamForm_DATE,
    ClamForm_TEXTAREA,
    ClamForm_CHECKBOXES,
    //ClamForm_SWITCH,
    //ClamForm_TAGS,
    ClamForm_IMAGE,
  },
  props: {
    value: {
      type: Object,
    },
    fields: {
      type: Array as () => IClamFormField[],
    },
  },
  methods: {
    determineShow(field: IClamFormField) {
      return field.showIf ? field.showIf(this.value) : true;
    },
    determineReadonly(field: IClamFormField) {
      if (field.readonly instanceof Function) {
        return field.readonly(this.value) || false;
      } else if (field.readonly != null) {
        return field.readonly;
      } else {
        return false;
      }
    },
    determineDisabled(field: IClamFormField) {
      if (field.disabled instanceof Function) {
        return field.disabled(this.value) || false;
      } else if (field.disabled != null) {
        return field.disabled;
      } else {
        return false;
      }
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
