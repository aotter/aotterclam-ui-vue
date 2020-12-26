<template>
  <div>
    <draggable
      :list="value"
      ghost-class="ghost"
      handle=".handle"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div
        v-for="(data, index) in value"
        :key="`${field.name}.${index}`"
        class="my-3"
      >
        <FieldSetNested
          @remove="remove(index)"
          v-bind="$props"
          :dragging="dragging"
          :show-header="true"
          :header-title="`${field.label} #${index + 1}`"
          :field="field"
          :value="data"
          @input="onInput($event, index)"
        />
      </div>
    </draggable>
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-primary btn-sm" @click="add">新增{{ field.label }}</button>
      </div>
      <div class="col text-right">
        <small v-if="value.length > 1">可用拖曳的方式調整順序</small>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { IClamFormField } from "../types";
import draggable from "vuedraggable";
import FieldSetNested from "./FieldSetNested.vue";

export default Vue.extend({
  components: {
    draggable,
    FieldSetNested,
  },
  props:{
    value:{
      type: Array
    },
    field:{
      type:Object as () => IClamFormField
    }
  },
  data() {
    return {
      dragging: false,
    };
  },
  methods: {
    remove(index: number) {
      const newValArray = [...this.value];
      newValArray.splice(index, 1);
      this.$emit("input", newValArray);
      // this.$confirm('您即將刪除本區塊資料，確定嗎？', '確認移除', {
      //   confirmButtonText: '確認移除',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // })
      //   .then(() => {
      //     const newValArray = [...this.value]
      //     newValArray.splice(index, 1)
      //     this.$emit('input', newValArray)
      //   })
      //   .catch(() => {})
    },
    add() {
      const newVal = [...this.value];
      newVal.push({});
      this.$emit("input", newVal);
    },
    onInput(value: any, index: number) {
      const newValArray = [...this.value];
      newValArray[index] = value;
      this.$emit("input", newValArray);
    },
  },
});
</script>
