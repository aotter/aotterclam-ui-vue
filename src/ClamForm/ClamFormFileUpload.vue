<template>
  <div>
    <FormGroup v-bind="$props" v-slot="validationContext">
      <b-form-file
        id=""
        @input="onInput"
        :multiple="_multiple"
        :accept="_accept"
        :state="getValidationState(validationContext)"
        :placeholder="_placeholder"
        :browse-text="'選擇檔案'"
      >
      </b-form-file>
    </FormGroup>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import FormGroup from "./FormGroup.vue";

export default Vue.extend({
  components: {
    FormGroup,
  },
  data: () => ({
    url: null as string | null,
    uploading: false,
  }),
  computed: {},
  methods: {},
});
</script>
