<template>
  <FormGroup v-bind="$props" v-slot="validationContext">
    <b-form-checkbox-group
      :checked="value"
      @change="onInput"
      :options="field.options"
      :state="getValidationState(validationContext)"
    ></b-form-checkbox-group>
  </FormGroup>
</template>
<script lang="ts">
import { IOptionsClamFormField } from "../types";
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

// watch out for https://github.com/logaretm/vee-validate/issues/2520

export default Vue.extend({
  components: {
    FormGroup,
  },
  props: {
    value: {
      type: Array,
    },
    field: {
      type: Object as () => IOptionsClamFormField,
      required: true,
      validator: (value: IOptionsClamFormField) => {
        return value.formTagType === "CHECKBOXES";
      },
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
    onInput(value: any[]) {
      console.log(value);
      const v =
        this.field.contentType === "number"
          ? value.map((v) => new Number(v).valueOf())
          : value;
      this.$emit("input", v);
    },
  },
});
</script>
