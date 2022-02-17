<template>
  <span>
    <!-- boostrap-vue b-modal is causing Chinese input compositionend event interruption, use hand-crafted modal instead -->
    <transition
      @enter="startTransitionModal"
      @after-enter="endTransitionModal"
      @before-leave="endTransitionModal"
      @after-leave="startTransitionModal"
    >
      <div class="modal fade" v-if="showModal" ref="modal">
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
                  cancelSize ? `btn-${cancelSize}` : '',
                ]"
                @click.prevent="showModal = !showModal"
                v-html="cancelHtml"
              ></button>
              <button
                :class="[
                  'btn',
                  `btn-${okVariant}`,
                  okSize ? `btn-${okSize}` : '',
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
import Vue from "vue";
export default Vue.extend({
  props: {
    cancelTitle: {
      type: String,
      default: "Cancel",
    },
    cancelTitleHtml: {
      type: String,
      default: null,
    },
    cancelVariant: {
      type: String,
      default: "secondary",
    },
    cancelSize: {
      type: String,
      default: null,
    },
    okTitle: {
      type: String,
      default: "OK",
    },
    okTitleHtml: {
      type: String,
      default: null,
    },
    okVariant: {
      type: String,
      default: "primary",
    },
    okSize: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: "md",
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    okHtml(): string {
      return this.okTitleHtml || this.okTitle;
    },
    cancelHtml(): string {
      return this.cancelTitleHtml || this.cancelTitle;
    },
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },
    toggle() {
      this.showModal = !this.showModal;
    },
    startTransitionModal() {
      (this.$refs.backdrop as HTMLElement)?.classList?.toggle("d-block");
      (this.$refs.modal as HTMLElement)?.classList?.toggle("d-block");
    },
    endTransitionModal() {
      (this.$refs.backdrop as HTMLElement)?.classList?.toggle("show");
      (this.$refs.modal as HTMLElement)?.classList?.toggle("show");
    },
  },
});
</script>
