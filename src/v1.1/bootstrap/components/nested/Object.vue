<template>
  <div
    :class="[
      'card',
      textVariant ? `text-${textVariant}` : '',
      bgVariant ? `bg-${bgVariant}` : '',
      borderVariant ? `border-${borderVariant}` : '',
    ]"
  >
    <div class="card-body">
      <FieldSet
        :fields="field.fields"
        :value="value"
        :readonly="readonly"
        :disabled="disabled"
        :field-layout-component="fieldLayoutComponent"
        :field-content-component="fieldContentComponent"
        @input="$emit('input', $event)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import FieldSet from "../../../core/FieldSet.vue";
import { IObjectClamField } from "../../types";
import { FieldMixin } from "../mixins";

export default Vue.extend({
  mixins: [FieldMixin],
  components: {
    FieldSet,
  },
  props: {
    fieldLayoutComponent: [String, Object, Function, Promise],
    fieldContentComponent: [String, Object, Function, Promise],
    value: Object,
    field: {
      type: Object as PropType<IObjectClamField>,
      required: true,
    },
  },
  computed: {
    textVariant(): string | undefined {
      return this.field.settings?.textVariant;
    },
    bgVariant(): string | undefined {
      return this.field.settings?.bgVariant;
    },
    borderVariant(): string | undefined {
      return this.field.settings?.borderVariant;
    },
  },
  methods: {},
});
</script>
