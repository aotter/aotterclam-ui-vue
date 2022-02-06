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
import Vue from "vue";
import BasicInput from "./BasicInput.vue";
import { FieldMixin } from "../mixins";

export default Vue.extend({
  mixins: [FieldMixin],
  components: {
    BasicInput,
  },
  props: {
    value: [String, Number],
    field: {
      type: Object,
      required: true,
    },
  },
  computed: {
    component() {
      return "BasicInput";
    },
  },
  methods: {},
});
</script>