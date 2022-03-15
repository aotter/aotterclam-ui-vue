<template>
  <span>
    <!-- boostrap-vue b-modal is causing Chinese input compositionend event interruption, use hand-crafted modal instead -->
    <!-- this comonent follows b-modal's convention -->
    <transition
      @enter="startTransitionModal"
      @after-enter="endTransitionModal"
      @before-leave="endTransitionModal"
      @after-leave="startTransitionModal"
    >
      <div
        class="modal fade"
        v-if="showModal"
        :style="{ display: showModal ? 'block' : 'none' }"
        ref="modal"
      >
        <div
          :class="`modal-dialog modal-dialog-scrollable modal-${size}`"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ title }}
              </h5>
              <button
                class="close"
                type="button"
                @click="showModal = !showModal"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <button
                :class="[
                  'btn',
                  `btn-${cancelVariant}`,
                  cancelSize ? `btn-${cancelSize}` : ''
                ]"
                @click.prevent="showModal = !showModal"
                v-html="cancelHtml"
              ></button>
              <button
                :class="[
                  'btn',
                  `btn-${okVariant}`,
                  okSize ? `btn-${okSize}` : ''
                ]"
                @click.prevent="$emit('ok')"
                v-html="okHtml"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="modal-backdrop fade d-none" ref="backdrop"></div>
  </span>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'BootstrapModal',
  props: {
    cancelTitle: {
      type: String,
      default: 'Cancel'
    },
    cancelTitleHtml: {
      type: String,
      default: null
    },
    cancelVariant: {
      type: String,
      default: 'secondary'
    },
    cancelSize: {
      type: String,
      default: null
    },
    okTitle: {
      type: String,
      default: 'OK'
    },
    okTitleHtml: {
      type: String,
      default: null
    },
    okVariant: {
      type: String,
      default: 'primary'
    },
    okSize: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'md'
    },
    title: {
      type: String
    }
  },
  setup(props) {
    const showModal = ref(false)
    const backdrop = ref<HTMLElement>()
    const modal = ref<HTMLElement>()

    const okHtml = computed(() => props.okTitleHtml || props.okTitle)
    const cancelHtml = computed(
      () => props.cancelTitleHtml || props.cancelTitle
    )

    function show() {
      showModal.value = true
    }

    function hide() {
      showModal.value = false
    }

    function toggle() {
      showModal.value = !showModal.value
    }

    function startTransitionModal() {
      backdrop.value?.classList?.toggle('d-block')
      modal.value?.classList?.toggle('d-block')
    }

    function endTransitionModal() {
      backdrop.value?.classList?.toggle('show')
      modal.value?.classList?.toggle('show')
    }

    return {
      showModal,
      backdrop,
      modal,
      okHtml,
      cancelHtml,
      show,
      hide,
      toggle,
      startTransitionModal,
      endTransitionModal
    }
  }
})
</script>
