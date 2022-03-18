<template>
  <div class="form-group row">
    <label for="" class="col-sm-2 col-form-label text-md-right">
      <span v-if="required" class="ml-1 text-danger">*</span>
      {{ label }}
    </label>
    <div class="col-sm-10">
      <slot></slot>
      <small class="form-text text-muted">{{ description }}</small>
      <div class="invalid-feedback" v-text="validationContext.errors[0]"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { IClamField } from '../types'

export default defineComponent({
  name: 'FormGroup',
  props: {
    validationContext: Object,
    field: {
      type: Object as PropType<IClamField>,
      required: true
    }
  },
  setup(props) {
    const label = computed(() => props.field.label || props.field.name)
    const description = computed(() => props.field.description)
    const required = computed(() => props.field.rules?.includes('required'))

    return {
      label,
      description,
      required
    }
  }
})
</script>
