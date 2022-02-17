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
            <div class="d-flex w-100 justify-content-between">
              <div>
                {{ data }}
              </div>
              <div v-if="!readonly">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="update(data, index)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
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
          class="btn btn-primary btn-sm"
          @click="add"
          :disabled="disabled"
        >
          新增{{ field.label }}
        </button>
      </div>
    </div>
    <modal ref="modal" @ok="onOk">
      <FieldSet
        :fields="field.fields"
        :value="tmpData"
        :field-layout-component="fieldLayoutComponent"
        :field-content-component="fieldContentComponent"
        @input="onInput($event)"
      />
    </modal>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import Modal from "../common/Modal.vue";
import FieldSet from "../../../core/FieldSet.vue";
import { IClamField } from "../../types";
import FormGroup from "../../FormGroup.vue";
import ClamFormField from "../../ClamFormField.vue";
import { FieldMixin } from "../mixins";

export default Vue.extend({
  mixins: [FieldMixin],
  components: {
    Modal,
    FieldSet,
  },
  props: {
    value: Array,
    field: {
      type: Object as PropType<IClamField>,
      required: true,
    },
  },
  data() {
    return {
      editIndex: 0, // index of the currently editing data
      tmpData: {}, // currently working data
      mode: "create", // 'create' or 'update'
    };
  },
  computed: {
    fieldLayoutComponent(): Function {
      return FormGroup;
    },
    fieldContentComponent(): Function {
      return ClamFormField;
    },
  },
  methods: {
    add() {
      this.tmpData = {};
      this.mode = "create";
      (this.$refs.modal as any).show();
    },
    update(data: any, index: number) {
      this.tmpData = JSON.parse(JSON.stringify(data));
      this.editIndex = index;
      this.mode = "update";
      (this.$refs.modal as any).show();
    },
    remove(index: number) {
      const newValArray = [...this.value];
      newValArray.splice(index, 1);
      this.$emit("input", newValArray);
    },
    onInput(data: any) {
      this.tmpData = data;
    },
    onOk() {
      const localData = JSON.parse(JSON.stringify(this.tmpData));
      const currVal = this.value || [];
      const newValArray = [...currVal];
      // create mode
      if (this.mode === "create") {
        newValArray.push(localData);
      }
      // update mode
      else {
        newValArray[this.editIndex] = localData;
      }
      this.$emit("input", newValArray);
      (this.$refs.modal as any).hide();
    },
  },
});
</script>
