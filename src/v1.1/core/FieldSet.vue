<template>
  <div>
    <template v-for="field in fields">
      <Field
        :key="field.name"
        :field="field"
        :value="value"
        :layout-component="fieldLayoutComponent"
        v-slot="{ validationContext, fieldValue, readonly, disabled }"
      >
        <template v-if="field.fields && field.fields.length > 0">
          <template v-if="field.contentType === 'Array'">
            <component
              v-if="arrayContentComponent"
              :is="arrayContentComponent"
              :field-layout-component="fieldLayoutComponent"
              :field-content-component="fieldContentComponent"
              :array-content-component="arrayContentComponent"
              :field="field"
              :value="fieldValue"
              @input="onInput($event, field)"
            />
            <span v-else
              >Missing arrayContentComponent for field {{ field.name }}</span
            >
          </template>
          <template v-else-if="field.contentType === 'Object'">
            <FieldSet
              :fields="field.fields"
              :value="fieldValue"
              :field-layout-component="fieldLayoutComponent"
              :field-content-component="fieldContentComponent"
              :array-content-component="arrayContentComponent"
              @input="onInput($event, field)"
            />
          </template>
        </template>
        <template v-else>
          <component
            v-if="fieldContentComponent"
            :is="fieldContentComponent"
            :field="field"
            :value="fieldValue"
            :validation-context="validationContext"
            :readonly="readonly"
            :disabled="disabled"
            @input="onInput($event, field)"
          />
          <span v-else
            >Missing fieldContentComponent for field {{ field.name }}</span
          >
        </template>
      </Field>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Field from "./Field.vue";
import { IBaseClamField } from "./types";

export default Vue.extend({
  name: "FieldSet",
  components: {
    Field,
  },
  props: {
    fieldLayoutComponent: [String, Object, Function, Promise],
    fieldContentComponent: [String, Object, Function, Promise],
    arrayContentComponent: [String, Object, Function, Promise],
    value: [Object, Array],
    fields: {
      type: Array,
    },
  },
  methods: {
    onInput(value: any, field: IBaseClamField) {
      this.$emit("input", { ...this.value, [field.name]: value });
    },
  },
});
</script>