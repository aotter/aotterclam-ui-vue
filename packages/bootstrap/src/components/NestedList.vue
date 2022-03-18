<template>
  <div>
    <div class="row my-1">
      <div class="col">
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(data, index) in value"
            :key="`${field.name}.${index}`"
          >
            <div
              class="d-flex w-100 justify-content-between align-items-center"
            >
              <div>
                {{ getTitle(data, index) }}
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="update(data, index)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  v-if="!readonly"
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="remove(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="row my-1" v-if="!readonly">
      <div class="col">
        <button
          type="button"
          :class="[
            'btn',
            `btn-${createBtn.variant}`,
            createBtn.size ? `btn-${createBtn.size}` : ''
          ]"
          @click="add"
          :disabled="disabled"
          v-html="createBtn.titleHtml"
        ></button>
      </div>
    </div>
    <modal
      ref="modal"
      :title="modalTitle"
      :size="modalSize"
      :cancel-title-html="modalCancelBtn.titleHtml"
      :cancel-variant="modalCancelBtn.variant"
      :cancel-size="modalCancelBtn.size"
      :ok-title-html="modalOkBtn.titleHtml"
      :ok-variant="modalOkBtn.variant"
      :ok-size="modalOkBtn.size"
      @ok="onOk"
    >
      <FieldSet
        :fields="field.fields"
        :value="tmpData"
        :readonly="readonly"
        :disabled="disabled"
        :field-layout-component="fieldLayoutComponent"
        :field-content-component="fieldContentComponent"
        @input="onInput($event)"
      />
    </modal>
  </div>
</template>
<script lang="ts">
import {
  computed,
  PropType,
  ref,
  defineComponent,
  Data
} from '@vue/composition-api'
import Modal from './Modal.vue'
import { FieldSet } from '@aotter/aotterclam-ui-vue-core'
import { withProps } from '../composables/useField'
import { ButtonSetting, IArrayClamField } from '../../types'

export default defineComponent({
  name: 'NestedList',
  components: {
    Modal,
    FieldSet
  },
  props: {
    ...withProps(),
    fieldLayoutComponent: [String, Object, Function, Promise], // this will prevent circular reference
    fieldContentComponent: [String, Object, Function, Promise], // this will prevent circular reference
    value: {
      type: Array,
      default: () => []
    },
    field: {
      type: Object as PropType<IArrayClamField>,
      required: true
    }
  },
  setup(props, ctx) {
    const modal = ref()
    const editIndex = ref(0)
    const tmpData = ref<Data>({})
    const mode = ref('create')

    const createBtn = computed(() =>
      buildButton(
        props.field?.settings?.create,
        `Create ${props.field.label}`,
        'primary',
        'sm'
      )
    )

    const modalSetting = computed(() => props.field.settings?.modal)
    const modalSize = computed(() => modalSetting.value?.size)
    const modalTitleCreate = computed(
      () => modalSetting.value?.titleCreate || createBtn.value.title
    )
    const modalTitleUpdate = computed(() => {
      const update = modalSetting.value?.titleUpdate
      return update && update instanceof Function
        ? update(tmpData.value, editIndex.value)
        : update || `Edit ${props.field.label}`
    })
    const modalTitle = computed(() =>
      mode.value === 'create' ? modalTitleCreate.value : modalTitleUpdate.value
    )
    const modalCancelBtn = computed(() =>
      buildButton(modalSetting.value?.cancel, 'Cancel')
    )
    const modalOkBtn = computed(() => buildButton(modalSetting.value?.ok, 'OK'))

    function buildButton(
      setting: ButtonSetting | undefined,
      defaultTitle: string,
      defaultVariant?: string,
      defaultSize?: string
    ) {
      const title = setting?.title || defaultTitle
      return {
        title,
        titleHtml: setting?.titleHtml || title,
        variant: setting?.variant || defaultVariant,
        size: setting?.size || defaultSize
      }
    }

    function getTitle(data: any, index: number) {
      return props.field?.getTitle
        ? props.field?.getTitle(data, index)
        : `${props.field.label} #${index + 1}`
    }

    function add() {
      tmpData.value = {}
      mode.value = 'create'
      modal.value.show()
    }

    function update(data: any, index: number) {
      tmpData.value = JSON.parse(JSON.stringify(data))
      editIndex.value = index
      mode.value = 'update'
      modal.value.show()
    }

    function remove(index: number) {
      const newValArray = [...props.value]
      newValArray.splice(index, 1)
      ctx.emit('input', newValArray)
    }

    function onInput(data: any) {
      tmpData.value = data
    }

    function onOk() {
      const localData = JSON.parse(JSON.stringify(tmpData.value))
      const currVal = props.value || []
      const newValArray = [...currVal]
      // create mode
      if (mode.value === 'create') {
        newValArray.push(localData)
      }
      // update mode
      else {
        newValArray[editIndex.value] = localData
      }
      ctx.emit('input', newValArray)
      modal.value.hide()
    }

    return {
      modal,
      editIndex,
      tmpData,
      mode,
      createBtn,
      modalSetting,
      modalSize,
      modalTitle,
      modalCancelBtn,
      modalOkBtn,
      getTitle,
      add,
      update,
      remove,
      onInput,
      onOk
    }
  }
})
</script>
