# AotterClam UI Vue

- For packaging, I followed instruction of https://blog.harveydelaney.com/creating-your-own-vue-component-library/

- Currently this project is private. 

# Installation

1. In your project root, create a file name `.npmrc` with the following content
```
@aotter:registry=https://npm.pkg.github.com
```

2. Login to your github account
```
npm login --registry=https://npm.pkg.github.com --scope=@aotter
```
  - username: your github username
  - password: generate a github personal access token with `read:packages` privilege


3. In your project, run
```
npm i @aotter/aotterclam-ui-vue
```


# Usage
```vue
<template>
    <ClamForm
      :fields="fields"
      v-model="formData"
      label-cols-sm="2"
      label-align-sm="right"
    />
</template>

<script lang="ts">
import Vue from "vue";
import { ClamForm } from "@aotter/aotterclam-ui-vue";
import { IClamFormField } from "@aotter/aotterclam-ui-vue/lib/types";
export default Vue.extend({
  components: {
    ClamForm,
  },
  data() {
    return {
      formData: {},
      fields: [
        {
          name: "title",
          label: "標題",
          contentType: "string",
          formTagType: "INPUT",
          description: "資料的標題",
          rules: "required",
        }
      ] as IClamFormField[],
    };
  },
});
</script>

```

require boostrap-vue  and bootstrap-vue-icons deps
node 14
