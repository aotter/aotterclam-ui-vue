<template>
  <FormGroup v-bind="$props">
    <div role="group" :id="field.name">
      <div
        class="form-check form-check-inline"
        v-for="(option, index) in field.options"
        :key="index"
      >
        <input
          type="checkbox"
          ref="cb"
          :class="['form-control', getValidationClass(validationContext)]"
          :id="`${field.name}_${index}`"
          :value="option.value"
          v-model="localValue"
          @change="updateVals"
        />

        <label
          class="form-check-label"
          :for="`${field.name}_${index}`"
          v-text="option.text"
        ></label>
      </div>
    </div>
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
    updateVals(e: any) {
      const vals = (this.$refs["cb"] as any)
        .filter((t: any) => t.checked)
        .map((t: any) => t.value);
      this.$emit("input", vals);
    },
  },
});
</script>
