<template>
  <div class="card bg-light">
    <div class="card-body">
      <template v-for="childField in field.fields">
        <template
          v-if="
            childField.fields &&
            childField.fields.length > 0 &&
            determineShow(childField)
          "
        >
          <template v-if="childField.contentType === 'Object'">
            <FieldSetNested
              v-bind="$props"
              :key="childField.name"
              :field="childField"
              :value="getFormDataValue(childField)"
              @input="onInput($event, childField.name)"
            />
          </template>
          <template v-else-if="childField.contentType === 'Array'">
            <FieldSetArray
              v-bind="$props"
              :key="childField.name"
              :field="childField"
              :value="getFormDataValue(childField)"
              @input="onInput($event, childField.name)"
            />
          </template>
        </template>
        <template v-else>
          <component
            :is="`ClamForm_${childField.formTagType}`"
            :key="`${field.name}.${childField.name}`"
            v-bind="$props"
            :field="childField"
            v-if="determineShow(childField)"
            :readonly="determineReadonly(childField)"
            :disabled="determineDisabled(childField)"
            :value="getFormDataValue(childField)"
            @input="onInput($event, childField.name)"
          ></component>
        </template>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamFormField } from "../types";
import ClamForm_INPUT from "./ClamFormInput.vue";
import ClamForm_RADIO from "./ClamFormRadioGroup.vue";
//import ClamForm_DATE from "./ClamFormDatePicker.vue";
import ClamForm_TEXTAREA from "./ClamFormTextArea.vue";
import ClamForm_SELECT from "./ClamFormSelect.vue";
import ClamForm_CHECKBOXES from "./ClamFormCheckboxGroup.vue";
import ClamForm_SWITCH from "./ClamFormSwitch.vue";
import ClamForm_TAGS from "./ClamFormTag.vue";
import ClamForm_IMAGE from "./ClamFormCropImageUploader.vue";

export default Vue.extend({
  name: "FieldSetNested",
  components: {
    FieldSetArray: () => import("./FieldSetArray.vue").then((d) => d.default),
    ClamForm_INPUT,
    ClamForm_SELECT,
    ClamForm_RADIO,
    //ClamForm_DATE,
    ClamForm_TEXTAREA,
    ClamForm_CHECKBOXES,
    ClamForm_SWITCH,
    ClamForm_TAGS,
    ClamForm_IMAGE,
  },
  props: {
    value: {
      type: Object,
    },
    field: {
      type: Object as () => IClamFormField,
    },
  },
  data() {
    return {};
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
