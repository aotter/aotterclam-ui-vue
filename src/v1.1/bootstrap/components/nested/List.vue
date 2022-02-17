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
          :class="`btn btn-${createBtn.variant} btn-${createBtn.size}`"
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
import Vue, { PropType } from "vue";
import Modal from "../common/Modal.vue";
import FieldSet from "../../../core/FieldSet.vue";
import { ButtonSetting, IArrayClamField, ModalSetting } from "../../types";
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
      type: Object as PropType<IArrayClamField>,
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
    createBtn(): {
      title: string;
      titleHtml: string;
      variant: string;
      size: string;
    } {
      return {
        ...this.btnTitle(
          this.field?.settings?.create,
          `Create ${this.field.label}`
        ),
        size: this.field?.settings?.create?.size || "sm",
        variant: this.field?.settings?.create?.variant || "primary",
      };
    },
    modalSetting(): ModalSetting | undefined {
      return this.field.settings?.modal;
    },
    modalSize(): "xl" | "lg" | "md" | "sm" | undefined {
      return this.modalSetting?.size;
    },
    modalTitle(): string {
      if (this.mode === "create") {
        return this.modalTitleCreate;
      } else {
        return this.modalTitleUpdate;
      }
    },
    modalTitleCreate(): string {
      return this.modalSetting?.titleCreate || this.createBtn.title;
    },
    modalTitleUpdate(): string {
      const update = this.modalSetting?.titleUpdate;
      return update && update instanceof Function
        ? update(this.tmpData, this.editIndex)
        : update || `Edit ${this.field.label}`;
    },
    modalCancelBtn(): {
      title: string;
      titleHtml: string;
      variant?: string;
      size?: string;
    } {
      return {
        ...this.btnTitle(this.modalSetting?.cancel, "Cancel"),
        variant: this.modalSetting?.cancel?.variant,
        size: this.modalSetting?.cancel?.size,
      };
    },
    modalOkBtn(): {
      title: string;
      titleHtml: string;
      variant?: string;
      size?: string;
    } {
      return {
        ...this.btnTitle(this.modalSetting?.ok, "OK"),
        variant: this.modalSetting?.ok?.variant,
        size: this.modalSetting?.ok?.size,
      };
    },
    fieldLayoutComponent(): Function {
      return FormGroup;
    },
    fieldContentComponent(): Function {
      return ClamFormField;
    },
  },
  methods: {
    btnTitle(
      setting: ButtonSetting | undefined,
      defaultTitle: string
    ): { title: string; titleHtml: string } {
      const title = setting?.title || defaultTitle;
      return {
        title,
        titleHtml: setting?.titleHtml || title,
      };
    },

    getTitle(data: any, index: number) {
      return this.field?.getTitle
        ? this.field?.getTitle(data, index)
        : `${this.field.label} #${index + 1}`;
    },
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
