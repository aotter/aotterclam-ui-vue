<template>
  <component
    :is="component"
    :value="value"
    :field="field"
    :readonly="readonly"
    :disabled="disabled"
    :validation-context="validationContext"
    @input="$emit('input', $event)"
  />
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import BasicInput from "./BasicInput.vue";
import { FieldMixin } from "../mixins";
import { IInputClamField } from "../../types";

export default Vue.extend({
  mixins: [FieldMixin],
  components: {
    BasicInput,
  },
  props: {
    value: [String, Number],
    field: {
      type: Object as PropType<IInputClamField>,
      required: true,
    },
  },
  computed: {
    component(): string {
      switch (this.field.inputTagType) {
        case "checkbox":
          if (this.field.contentType === "boolean") {
            return "Checkbox";
          } else {
            return "CheckboxGroup";
          }
        case "radio":
          return "RadioGroup";
        default:
          return "BasicInput";
      }
    },
  },
  methods: {},
});
</script>