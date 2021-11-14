<template>
  <div>
    <FormGroup v-bind="$props" v-slot="validationContext">
      <component
        :is="field.component"
        :field="field"
        @input="onInput"
        :value="value"
        :readonly="readonly"
        :disabled="disabled"
        :validation-context="validationContext"
      />
    </FormGroup>
  </div>
</template>
<script>
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
  },
  props: ["value", "field", "readonly", "disabled"],
  computed: {},
  methods: {
    getValidationState({ dirty, validated, valid }) {
      return dirty || validated ? valid : null;
    },
    onInput(value) {
      this.$emit("input", value);
    },
  },
});
</script>
