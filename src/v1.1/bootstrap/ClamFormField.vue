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
import { FieldMixin } from "./components/mixins";
import { IClamField } from "./types";
import INPUT from "./components/Input/index.vue";
export default Vue.extend({
  mixins: [FieldMixin],
  components: {
    INPUT,
  },
  props: {
    value: [String, Number, Boolean, Object, Array],
    field: {
      type: Object as PropType<IClamField>,
      required: true,
    },
  },
  computed: {
    component(): string | Function {
      return this.field.component;
    },
  },
  methods: {},
});
</script>
