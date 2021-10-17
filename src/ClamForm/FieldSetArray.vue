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
          class="d-flex justify-content-between align-items-center"
        >
          {{ getTitle(data, index) }}
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
    <b-modal
      ref="modal"
      :title="modalTitle"
      ok-title="確認"
      cancel-title="取消"
      @ok="onOk"
    >
      <FieldSetNested
        v-bind="$props"
        :field="field"
        :value="tmpData"
        @input="onInput($event)"
      />
    </b-modal>
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
  },
  methods: {
    getTitle(data, index) {
      return this.field?.getTitle
        ? this.field?.getTitle(data)
        : `${this.field.label} #${index + 1}`;
    },
    remove(index) {
      const newValArray = [...this.value];
      newValArray.splice(index, 1);
      this.$emit("input", newValArray);
    },
    add() {
      this.mode = "create";
      this.showModal();
    },
    update(data, index) {
      this.tmpData = JSON.parse(JSON.stringify(data));
      this.editIndex = index;
      this.mode = "update";
      this.showModal();
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
      this.tmpData = {};
    },
    onInput(data) {
      this.tmpData = data;
    },
    showModal() {
      this.$refs["modal"].show();
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
