<template>
  <div>
    <div>
      <img
        v-if="preview"
        style="cursor: pointer"
        @click.prevent="triggerFileInput"
        :src="imgSrc"
        class="img-responsive img-thumbnail"
        :style="{ width: `${displayWidth}` }"
      />
      <b-button
        v-else
        @click.prevent="triggerFileInput"
        variant="outline-secondary"
        ><i class="el-icon-upload"></i> 上傳
      </b-button>
      <small
        class="text-muted"
        style="cursor: pointer"
        @click.prevent="triggerFileInput"
        >點此{{ btnText }} {{ helpText }}</small
      >
    </div>

    <input
      type="file"
      ref="fileInput"
      style="display: none"
      :accept="acceptImageType"
      @change="setImage"
    />

    <b-modal
      v-model="showModal"
      title="選擇裁切範圍"
      cancel-title="取消"
      ok-title="確認裁切上傳"
      @hide="reset"
    >
      <b-overlay :show="uploading" rounded="sm">
        <img
          ref="image"
          :src="url"
          crossorigin
          style="max-width: 100%; max-height: 350px"
        />
      </b-overlay>
      <template slot="modal-footer">
        <b-button @click="cropAndUpload" :disabled="uploading"
          >確認裁切上傳</b-button
        >
      </template>
    </b-modal>
  </div>
</template>
<script lang="js">
import Vue from "vue";
import Cropper from "cropperjs";
//import "cropperjs/dist/cropper.min.css";
import * as FileAPI from "fileapi";
import { BModal, BButton, BOverlay } from "bootstrap-vue";

export default Vue.extend({
  components: {
    BModal,
    BButton,
    BOverlay,
  },
  props: {
    value: {
      type: String,
      default: null,
    },

    btnText: {
      type: String,
      default: "上傳圖片",
    },

    preview: {
      type: Boolean,
      default: true,
    },

    displayWidth: {
      type: String,
      default: "50%",
    },

    // 可接受圖片格式
    acceptImageType: {
      type: String,
      default: "image/png, image/gif, image/jpeg, image/jpg",
    },

    width: {
      type: Number,
      default: 300,
    },

    height: {
      type: Number,
      default: 300,
    },
  },

  data() {
    return {
      cropper: {} ,
      url: null ,
      showModal: false,
      fileName: null ,
      fileType: null,
      uploading: false,
    };
  },

  computed: {
    imgSrc() {
      return (
        this.value ||
        "https://via.placeholder.com/" +
          this.width +
          "x" +
          this.height +
          "?text=" +
          this.width +
          "x" +
          this.height
      );
    },
    helpText() {
      return `${this.width} x ${this.height} ${this.acceptImageType
        .split(",")
        .map((s) => s.replace("image/", "").trim())
        .join(", ")}`;
    },
  },

  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      this.fileType = file.type;
      this.fileName = file.name;
      this.url = URL.createObjectURL(file);
      this.showModal = true;
      this.$nextTick(() => {
        this.cropper = new Cropper(this.$refs.image, {
          viewMode: 2,
          guides: false,
          autoCropArea: 1,
          aspectRatio: this.width / this.height,
          background: false,
        });
      });
    },
    cropAndUpload() {
      this.cropper.getCroppedCanvas().toBlob(
        (blob) => {
          this.resizeAndUpload(blob);
        },
        this.fileType,
        1
      );
    },
    resizeAndUpload(file) {
      FileAPI.Image(file)
        .resize(this.width, this.height)
        .get((error, canvasElement) => {
          canvasElement.toBlob(
            (blob) => {
              this.upload(blob);
            },
            this.fileType,
            0.9
          );
        });
    },
    async upload(file) {
      this.uploading = true;
      if (file == null) {
        alert("error, no file");
        return;
      }
      // todo
      //   const formData = new FormData()
      //   formData.append('file', file, this.fileName!)
      //   const {
      //     data: { url },
      //   } = await HttpClient.post('api/media/upload', formData)
      this.uploading = false;
      //this.$emit('input', url)
      this.reset();
    },
    reset() {
      this.showModal = false;
      this.url = null;
      this.fileName = null;
      this.fileType = null;
      (this.$refs.fileInput).value = null;
    },
  },
});
</script>
