<template>
  <input
    v-bind="field.inputTagAttrs"
    :class="['form-control', getValidationClass(validationContext)]"
    :type="type"
    :value="value"
    :readonly="readonly"
    :disabled="disabled"
    @input="onInput($event.target.value)"
    :placeholder="field.placeholder"
  />
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { IInputNumberClamField, IInputStringClamField } from "../../types";
import { FieldMixin } from "../mixins";
export default Vue.extend({
  mixins: [FieldMixin],
  props: {
    value: [String, Number],
    field: {
      type: Object as PropType<IInputStringClamField | IInputNumberClamField>,
      required: true,
    },
  },
  computed: {
    type(): string {
      // only 'number' and 'string' are possible values here
      return this.field.contentType === "number" ? "number" : "text";
    },
  },
  methods: {
    onInput(value: any) {
      const v = this.type === "number" ? new Number(value).valueOf() : value;
      this.$emit("input", v);
    },
  },
});
</script>