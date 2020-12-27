<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <div role="group" :id="field.name">
      <div
        class="form-check form-check-inline"
        v-for="(option, index) in field.options"
        :key="index"
      >
        <input
          type="checkbox"
          :class="['form-check-input', getValidationClass(validationContext)]"
          :value="option.value"
          :id="`${field.name}_${index}`"
          v-model="localValue"
        />

        <label
          class="form-check-label"
          :for="`${field.name}_${index}`"
          v-text="option.text"
        ></label>
      </div>
    </div>
  </FormGroup>
  <!-- <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-checkbox-group
      :checked="value"
      @input="onInput"
      :options="_options"
      :state="getValidationState(validationContext)"
    ></b-form-checkbox-group>
  </FormGroup> -->
</template>
<script lang="ts">
import { IClamFormField, IOptionsClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
  },
  props: {
    value: Array,
    field: {
      type: Object as () => IOptionsClamFormField,
      required: true,
      validator: (value: IOptionsClamFormField) => {
        return value.formTagType === "CHECKBOXES";
      },
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  watch: {
    localValue(newValue, oldValue) {
      const vs = newValue.map((v: any) => {
        return this.field.contentType === "number"
          ? new Number(v).valueOf()
          : v;
      });
      this.$emit("input", vs);
    },
  },
  methods: {
    getValidationClass({
      dirty,
      validated,
      valid,
    }: {
      dirty: boolean;
      validated: boolean;
      valid: boolean;
    }) {
      return dirty || validated ? (valid ? "is-valid" : "is-invalid") : "";
    },
  },
});
</script>
