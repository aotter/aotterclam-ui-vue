<template>
  <component
    :is="component"
    :value="value"
    :field="field"
    :field-layout-component="fieldLayoutComponent"
    :field-content-component="fieldContentComponent"
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
import LIST from "./components/nested/List.vue";
import OBJECT from "./components/nested/Object.vue";

export default Vue.extend({
  mixins: [FieldMixin],
  components: {
    INPUT,
    LIST,
    OBJECT,
  },
  props: {
    fieldLayoutComponent: [String, Object, Function, Promise], // this will prevent circular reference
    fieldContentComponent: [String, Object, Function, Promise], // this will prevent circular reference
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
