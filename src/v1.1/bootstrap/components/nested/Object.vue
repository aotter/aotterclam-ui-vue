<template>
  <FieldSet
    :fields="field.fields"
    :value="value"
    :readonly="readonly"
    :disabled="disabled"
    :field-layout-component="fieldLayoutComponent"
    :field-content-component="fieldContentComponent"
    @input="$emit('input', $event)"
  />
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import FieldSet from "../../../core/FieldSet.vue";
import { IClamField } from "../../types";
import FormGroup from "../../FormGroup.vue";
import ClamFormField from "../../ClamFormField.vue";
import { FieldMixin } from "../mixins";

export default Vue.extend({
  mixins: [FieldMixin],
  components: {
    FieldSet,
  },
  props: {
    value: Object,
    field: {
      type: Object as PropType<IClamField>,
      required: true,
    },
  },
  computed: {
    fieldLayoutComponent(): Function {
      return FormGroup;
    },
    fieldContentComponent(): Function {
      return ClamFormField;
    },
  },
  methods: {},
});
</script>
