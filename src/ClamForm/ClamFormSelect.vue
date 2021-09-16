<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <select
      :class="['form-control', getValidationClass(validationContext)]"
      v-model="localValue"
      @change="onInput($event.target.value)"
    >
      <option
        v-for="(option, index) in field.options"
        :key="index"
        :value="option.value"
        :label="option.text"
      ></option>
    </select>
  </FormGroup>
</template>
<script lang="ts">
import { IOptionsClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
  },
  props: {
    value: [String, Number],
    field: {
      type: Object as () => IOptionsClamFormField,
      required: true,
      validator: (value: IOptionsClamFormField) => {
        return value.formTagType === "SELECT";
      },
    },
  },
  data() {
    return {
      // only need to set initial value
      localValue: this.value,
    };
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
    onInput(value: any) {
      const v =
        this.field.contentType === "number"
          ? new Number(value).valueOf()
          : value;
      this.$emit("input", v);
    },
  },
});
</script>
