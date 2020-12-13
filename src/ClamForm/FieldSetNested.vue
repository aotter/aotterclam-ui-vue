<template>
  <b-card bg-variant="light" no-body>
    <!-- used in FieldSetArray -->
    <b-card-header v-if="showHeader" header-tag="header">
      <b-row class="justify-content-between">
        <b-col class="ml-2">
          {{ headerTitle }}
        </b-col>
        <b-col class="text-right">
          <b-button variant="link" size="sm" @click="visible = !visible">
            <small v-if="!visible"
              >點擊展開
              <i class="fas fa-chevron-right"></i>
            </small>
            <small v-if="visible"
              >點擊收合
              <i class="fas fa-chevron-down"></i>
            </small>
          </b-button>

          <b-button
            variant="outline-secondary"
            size="sm"
            @click="$emit('remove')"
          >
            <i class="fas fa-times"></i>
          </b-button>
        </b-col>
      </b-row>
    </b-card-header>

    <b-collapse :id="`collapse_${field.name}`" v-model="visible">
      <b-card-body>
        <template v-for="childField in field.fields">
          <component
            :is="`ClamForm_${childField.formTagType}`"
            :key="`${field.name}.${childField.name}`"
            v-bind="$props"
            :field="childField"
            v-if="determineShow(childField)"
            :value="getFormDataValue(childField.name)"
            @input="onInput($event, childField.name)"
          ></component>
        </template>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamFormField } from "../types";
import {
  BCard,
  BCardHeader,
  BRow,
  BCol,
  BCollapse,
  BCardBody,
  BButton,
} from "bootstrap-vue";

import ClamForm_INPUT from "./ClamFormInput.vue";
import ClamForm_RADIO from "./ClamFormRadioGroup.vue";
import ClamForm_DATE from "./ClamFormDatePicker.vue";
import ClamForm_TEXTAREA from "./ClamFormTextArea.vue";
import ClamForm_CHECKBOXES from "./ClamFormCheckboxGroup.vue";
import ClamForm_SWITCH from "./ClamFormSwitch.vue";
import ClamForm_TAGS from "./ClamFormTag.vue";
import ClamForm_IMAGE from "./ClamFormCropImageUploader.vue";

export default Vue.extend({
  components: {
    BCard,
    BCardHeader,
    BButton,
    BRow,
    BCol,
    BCollapse,
    BCardBody,
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
    "value", // will be an Object
    "field",
    "showHeader",
    "headerTitle",
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
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    determineShow(field: IClamFormField) {
      return field.showIf ? field.showIf(this.value) : true;
    },
    getFormDataValue(name: string) {
      return this.value ? this.value[name] : null;
    },
    onInput(value: any, name: string) {
      this.$emit("input", { ...this.value, [name]: value });
    },
  },
});
</script>
<style scoped>
.card-header {
  padding: 0;
}
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
