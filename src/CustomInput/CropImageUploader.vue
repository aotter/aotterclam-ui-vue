<template>
  <div>
    <div>
      <img
        v-if="preview && value"
        style="cursor: pointer"
        @click.prevent="triggerFileInput"
        :src="value"
        class="img-responsive img-thumbnail"
        :style="{ width: `${displayWidth}` }"
      />
      <button
        v-else
        class="btn btn-outline-secondary"
        @click.prevent="triggerFileInput"
      >
        <i class="fas fa-upload"></i> 上傳
      </button>
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

    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">選擇裁切範圍</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" @click="showModal = false"
                    >&times;</span
                  >
                </button>
              </div>
              <div class="modal-body">
                <img
                  ref="image"
                  :src="url"
                  crossorigin
                  style="display: block; width: 100%; max-height: 350px"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="showModal = false"
                >
                  取消
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="cropAndUpload"
                  :disabled="busy"
                >
                  確認裁切上傳
                  <i v-if="busy" class="fas fa-spinner fa-spin"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="js">
import Vue from "vue";

export default Vue.extend({
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
    uploadFunction: {
      type: Function
    }
  },

  data() {
    return {
      cropper: {} ,
      url: null ,
      showModal: false,
      fileName: null ,
      fileType: null,
      busy: false,
    };
  },

  computed: {
    helpText() {
      return `${this.width} x ${this.height} ${this.acceptImageType
        .split(",")
        .map((s) => s.replace("image/", "").trim())
        .join(", ")}`;
    },
  },

  watch:{
    showModal(newValue, oldValue){
      if(newValue === false){
        this.reset()
      }
    }
  },

  async mounted(){
    // fixme: don't know how to pack
    await Promise.all([
      this.loadScript('clam-cropperjs', 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.9/cropper.min.js'),
      this.loadCss('clam-cropperjs-css', 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.9/cropper.min.css'),
      this.loadScript('clam-fileapi', 'https://cdn.jsdelivr.net/npm/fileapi@2.0.21/dist/FileAPI.min.js'),
    ])
  },

  methods: {
    loadScript(id, url) {
      const existing = document.getElementById(id)
      if(existing){
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.id = id
        script.onload = resolve
        script.onerror = reject
        script.src = url
        document.getElementsByTagName('head')[0].appendChild(script)
      })
    },
    loadCss(id, url) {
      const existing = document.getElementById(id)
      if(existing){
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
          var link = document.createElement('link')
          link.id = id
          link.onload = resolve
          link.onerror = reject
          link.type = 'text/css'
          link.rel = 'stylesheet'
          link.href = url
          document.getElementsByTagName('head')[0].appendChild(link)
      })
    },
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
      this.busy = true;
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
      if (file == null) {
        alert("error, no file");
        return;
      }
      console.log('upload', file, 'uploadFunction', this.uploadFunction)
      const formData = new FormData()
      formData.append('file', file, this.fileName)
      const url = await this.uploadFunction(formData)
      this.busy = false;
      this.$emit('input', url)
      this.showModal = false;
    },
    reset() {
      this.url = null;
      this.fileName = null;
      this.fileType = null;
      (this.$refs.fileInput).value = null;
    },
  },
});
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>