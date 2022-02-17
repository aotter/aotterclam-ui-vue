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
import { IClamField } from "../../types";

export default Vue.extend({
  mixins: [FieldMixin],
  components: {
    BasicInput,
  },
  props: {
    value: [String, Number],
    field: {
      type: Object as PropType<IClamField>,
      required: true,
    },
  },
  computed: {
    component(): string {
      // todo dispatch to different components based on field.contentType
      // see types
      return "BasicInput";
    },
  },
  methods: {},
});
</script>