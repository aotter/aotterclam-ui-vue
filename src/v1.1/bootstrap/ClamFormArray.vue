<template>
  <div>
    <div class="row my-1">
      <div class="col">
        <button type="button" class="btn btn-primary btn-sm" @click="add">
          新增{{ field.label }}
        </button>
      </div>
    </div>
    <modal ref="modal">
      <FieldSet
        :fields="field.fields"
        :value="tmpData"
        :field-layout-component="fieldLayoutComponent"
        :field-content-component="fieldContentComponent"
        :array-content-component="arrayContentComponent"
        @input="onInput($event)"
      />
    </modal>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Modal from "./components/common/Modal.vue";
import FieldSet from "../core/FieldSet.vue";

export default Vue.extend({
  components: {
    Modal,
    FieldSet,
  },
  props: {
    fieldLayoutComponent: [String, Object, Function, Promise],
    fieldContentComponent: [String, Object, Function, Promise],
    arrayContentComponent: [String, Object, Function, Promise],
    value: [String, Number, Boolean, Object, Array],
    field: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editIndex: null, // index of the currently editing data
      tmpData: {}, // currently working data
      mode: "create", // 'create' or 'update'
    };
  },
  computed: {},
  methods: {
    add() {
      this.tmpData = {};
      this.mode = "create";
      (this.$refs.modal as any).show();
    },
    onInput(data: any) {
      this.tmpData = data;
    },
  },
});
</script>
