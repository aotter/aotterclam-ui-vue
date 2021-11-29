<template>
  <div>
    <b-list-group>
      <draggable
        :list="value"
        ghost-class="ghost"
        handle=".handle"
        @start="dragging = true"
        @end="dragging = false"
      >
        <b-list-group-item
          v-for="(data, index) in value"
          :key="`${field.name}.${index}`"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">
            <div>
              {{ getTitle(data, index) }}
            </div>
            <div>
              <b-button
                variant="outline-secondary"
                size="sm"
                @click="update(data, index)"
                ><b-icon icon="pencil-square"></b-icon
              ></b-button>
              <b-button
                variant="outline-secondary"
                size="sm"
                @click="remove(index)"
                ><b-icon icon="trash"></b-icon
              ></b-button>
              <b-button
                v-if="value.length > 1"
                class="handle"
                variant="outline-secondary"
                size="sm"
                :style="{ cursor: dragging ? 'grabbing' : 'grab' }"
                ><b-icon icon="arrow-down-up"></b-icon
              ></b-button>
            </div>
          </div>
          <p
            class="mb-1 text-muted"
            v-if="getSummary(data)"
            v-html="nl2br(getSummary(data))"
          ></p>
        </b-list-group-item>
      </draggable>
    </b-list-group>
    <div class="row my-1">
      <div class="col">
        <button type="button" class="btn btn-primary btn-sm" @click="add">
          新增{{ field.label }}
        </button>
      </div>
      <div class="col text-right">
        <small v-if="value.length > 1"
          >可按住 <b-icon icon="arrow-down-up"></b-icon> 拖曳以調整順序</small
        >
      </div>
    </div>
    <!-- boostrap-vue b-modal is causing Chinese input compositionend vent interruption, use hand-crafted modal instead -->
    <!-- Modal-->
    <transition
      @enter="startTransitionModal"
      @after-enter="endTransitionModal"
      @before-leave="endTransitionModal"
      @after-leave="startTransitionModal"
    >
      <div class="modal fade" v-if="showModal" ref="modal">
        <div
          class="modal-dialog modal-dialog-scrollable"
          :class="[modalSize ? `modal-${modalSize}` : '']"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ modalTitle }}
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
              <FieldSetNested
                v-bind="$props"
                :field="field"
                :value="tmpData"
                @input="onInput($event)"
              />
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary"
                @click.prevent="showModal = !showModal"
              >
                取消
              </button>
              <button class="btn btn-primary" @click.prevent="onOk">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="modal-backdrop fade d-none" ref="backdrop"></div>
    <!--end Modal-->
  </div>
</template>
<script >
import Vue from "vue";
import draggable from "vuedraggable";
import FieldSetNested from "./FieldSetNested.vue";

export default Vue.extend({
  components: {
    draggable,
    FieldSetNested,
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    field: {
      type: Object,
    },
  },
  data() {
    return {
      dragging: false,
      showModal: false,
      editIndex: null, // index of the currently editing data
      tmpData: {}, // currently working data
      mode: "create", // 'create' or 'update'
    };
  },
  computed: {
    modalTitle() {
      const label = this.field?.label;
      return this.mode === "create"
        ? `新增${label}`
        : `編輯${this.getTitle(this.tmpData, this.editIndex)}`;
    },
    modalSize() {
      return this.field.settings?.modalSize;
    },
  },
  methods: {
    getTitle(data, index) {
      return this.field?.getTitle
        ? this.field?.getTitle(data)
        : `${this.field.label} #${index + 1}`;
    },
    getSummary(data) {
      return this.field?.getSummary ? this.field?.getSummary(data) : null;
    },
    // todo: move into util class?
    nl2br(str, is_xhtml) {
      if (typeof str === "undefined" || str === null) {
        return "";
      }
      var breakTag =
        is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
      return (str + "").replace(
        /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
        "$1" + breakTag + "$2"
      );
    },
    remove(index) {
      const newValArray = [...this.value];
      newValArray.splice(index, 1);
      this.$emit("input", newValArray);
    },
    add() {
      this.tmpData = {};
      this.mode = "create";
      this.showModal = true;
    },
    update(data, index) {
      this.tmpData = JSON.parse(JSON.stringify(data));
      this.editIndex = index;
      this.mode = "update";
      this.showModal = true;
    },
    onOk() {
      const localData = JSON.parse(JSON.stringify(this.tmpData));
      const newValArray = [...this.value];
      // create mode
      if (this.mode === "create") {
        newValArray.push(localData);
      }
      // update mode
      else {
        newValArray[this.editIndex] = localData;
      }
      this.$emit("input", newValArray);
      this.showModal = false;
    },
    onInput(data) {
      this.tmpData = data;
    },
    startTransitionModal() {
      this.$refs.backdrop?.classList?.toggle("d-block");
      this.$refs.modal?.classList?.toggle("d-block");
    },
    endTransitionModal() {
      this.$refs.backdrop?.classList?.toggle("show");
      this.$refs.modal?.classList?.toggle("show");
    },
  },
});
</script>
<style scoped>
.ghost {
  opacity: 0.7;
  background: #f8f9fa;
}
</style>
