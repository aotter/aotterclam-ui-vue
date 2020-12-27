<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <div role="radiogroup" tabindex="-1" :id="field.name">
      <div
        class="custom-control custom-radio custom-control-inline"
        v-for="(option, index) in field.options"
        :key="index"
      >
        <input
          type="radio"
          :class="[
            'custom-control-input',
            getValidationClass(validationContext),
          ]"
          :value="option.value"
          :id="`${field.name}_${index}`"
          :name="field.name"
          v-model="localValue"
        />

        <label
          class="custom-control-label"
          :for="`${field.name}_${index}`"
          v-text="option.text"
        ></label>
      </div>
    </div>
  </FormGroup>
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
    value: [String, Number],
    field: {
      type: Object as () => IOptionsClamFormField,
      required: true,
      validator: (value: IOptionsClamFormField) => {
        return value.formTagType === "RADIO";
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
      const v =
        this.field.contentType === "number"
          ? new Number(newValue).valueOf()
          : newValue;
      this.$emit("input", v);
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
