<template>
  <div>
    <ul>
      <template v-for="field in fields">
        <li :key="field.name">
          <Field
            :field="field"
            :value="value"
            v-slot="{ validationContext, fieldValue, show, readonly, disabled }"
          >
            {{ field }} v: {{ fieldValue }} {{ validationContext }} {{ show }}
            {{ readonly }} {{ disabled }}
            <template v-if="field.fields && field.fields.length > 0">
              <FieldSet :fields="field.fields" />
            </template>
          </Field>
        </li>
      </template>
    </ul>
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
    value: {
      type: Object,
    },
    fields: {
      type: Array,
    },
  },
  methods: {},
});
</script>