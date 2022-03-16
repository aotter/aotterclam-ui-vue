<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form @submit.prevent="handleSubmit(onSubmit)">
      <FieldSet
        v-if="fields && fields.length > 0"
        :fields="fields"
        :value="value"
        :field-layout-component="fieldLayoutComponent"
        :field-content-component="fieldContentComponent"
        @input="$emit('input', $event)"
      />
      <slot></slot>
      <button ref="submitbtn" type="submit" style="display: none"></button>
    </form>
  </ValidationObserver>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import FieldSet from './FieldSet.vue'

export default defineComponent({
  name: 'BaseForm',
  components: {
    FieldSet
  },
  props: {
    fieldLayoutComponent: [String, Object, Function, Promise],
    fieldContentComponent: [String, Object, Function, Promise],
    value: {
      type: Object
    },
    fields: {
      type: Array
    }
  },
  setup(_, ctx) {
    const submitbtn = ref()
    // a small hack to invoke handleSubmit function of ValidationObserver
    // otherwise submit the form directly will bypass ValidationObserver check
    function submit() {
      submitbtn.value.click()
    }

    function onSubmit() {
      ctx.emit('submit')
    }

    return {
      submit,
      onSubmit
    }
  }
})
</script>
