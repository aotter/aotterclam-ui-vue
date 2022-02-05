<template>
  <div>
    <template v-for="field in fields">
      <Field
        :key="field.name"
        :field="field"
        :value="value"
        :layoutComponent="fieldLayoutComponent"
        v-slot="{ validationContext, fieldValue, show, readonly, disabled }"
      >
        {{ field }} v: {{ fieldValue }} {{ validationContext }} {{ show }}
        {{ readonly }} {{ disabled }}
        <template v-if="field.fields && field.fields.length > 0">
          <FieldSet
            :fields="field.fields"
            :value="fieldValue"
            :fieldLayoutComponent="fieldLayoutComponent"
          />
        </template>
      </Field>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Field from "./Field.vue";

export default Vue.extend({
  name: "FieldSet",
  components: {
    Field,
  },
  props: {
    fieldLayoutComponent: [Object, Function, Promise],
    value: [Object, Array],
    fields: {
      type: Array,
    },
  },
  methods: {},
});
</script>