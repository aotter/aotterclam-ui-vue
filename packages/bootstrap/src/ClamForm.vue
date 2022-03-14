<template>
  <BaseForm
    ref="form"
    :value="value"
    :fields="fields"
    :field-layout-component="fieldLayout"
    :field-content-component="fieldContent"
    @input="$emit('input', $event)"
    @submit="onSubmit"
  >
    <slot>
      <!-- default submit button -->
      <button class="btn btn-primary offset-sm-2">Submit</button>
    </slot>
  </BaseForm>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { BaseForm } from '@aotter/aotterclam-ui-vue-core'

import FormGroup from './FormGroup.vue'
import ClamFormField from './ClamFormField.vue'

export default defineComponent({
  name: 'ClamForm',
  components: {
    BaseForm
  },
  props: {
    fieldLayoutComponent: [String, Object, Function, Promise],
    value: {
      type: Object
    },
    fields: {
      type: Array
    }
  },
  setup(props, ctx) {
    const form = ref<HTMLFormElement>()

    const fieldLayout = computed(() => props.fieldLayoutComponent ?? FormGroup)
    const fieldContent = computed(() => ClamFormField)

    function submit() {
      form.value?.submit()
    }

    function onSubmit() {
      ctx.emit('submit')
    }
    return {
      form,
      fieldLayout,
      fieldContent,
      submit,
      onSubmit
    }
  }
})
</script>
