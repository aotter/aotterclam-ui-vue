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
                class="btn btn-secondary"
                @click.prevent="showModal = !showModal"
              >
                {{ cancelTitle }}
              </button>
              <button class="btn btn-primary" @click.prevent="$emit('ok')">
                {{ okTitle }}
              </button>
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
    okTitle: {
      type: String,
      default: "OK",
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
  computed: {},
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
