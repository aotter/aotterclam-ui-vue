# @aotter/aotterclam-ui-vue-bootstrap

Implement AotterClam core with [bootstrap](https://getbootstrap.com/) and [vee-validate](https://vee-validate.logaretm.com/v3).

## Installation

### Before installation

Due to the package is private for now, you must use a **personal access token** with `read:packages` & `repo` scope to install it.

Make sure you've authenticated to Github Packages. If not, you can choose one of the following ways to do it.

1. Logging in to npm

   ```bash
   $ npm login --scope=@aotter --registry=https://npm.pkg.github.com

   > Username: USERNAME
   > Password: PERSONAL_ACCESS_TOKEN
   > Email: PUBLIC_EMAIL_ADDRESS
   ```

2. Editing `~/.npmrc` file with the following content

   ```
   @aotter:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=PERSONAL_ACCESS_TOKEN
   ```

### Install the package

```bash
npm i @aotter/aotterclam-ui-vue-bootstrap
```

And install peer dependencies

```bash
npm i vee-validate bootstrap @vue/composition-api
```

## Usage

### Vue

1. Update `main.js`/ `main.ts` file

```js
import Vue from 'vue'
import App from './App.vue'

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import VueCompositionAPI from '@vue/composition-api'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueCompositionAPI)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

2. Customize your form

```vue
<template>
  <div>
    <clam-form class="foo" v-model="formData" :fields="fields" :key="type" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { ClamForm } from '@aotter/aotterclam-ui-vue-bootstrap'

export default defineComponent({
  components: {
    ClamForm
  },
  setup() {
    const formData = ref()
    const fields = [
      {
        name: 'name',
        label: '姓名',
        contentType: 'string',
        component: 'Input',
        description: '輸入姓名，最多 20 個字',
        placeholder: '王大明',
        rules: 'required',
        inputTagAttrs: {
          maxlength: 20
        }
      },
      {
        name: 'email',
        label: 'Email',
        contentType: 'email',
        component: 'Input',
        description: '輸入您的 Email',
        placeholder: 'john.doe@gmail.com',
        rules: 'required|email',
        inputTagAttrs: {
          maxlength: 20
        }
      },
      {
        name: 'height',
        label: '身高',
        contentType: 'number',
        component: 'Input',
        description: '輸入身高 (cm)',
        inputTagAttrs: {
          min: 100,
          max: 300,
          step: 0.1
        }
      }
    ]

    return {
      formData,
      fields
    }
  }
})
</script>
```

### CDN

⚠️ Because the package is private, CDN is unavailable for now.

1. Add css/script in html head tag

```html
<!-- bootstrap style -->
<link
  type="text/css"
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
/>

<!-- vuejs -->
<script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>

<!-- vue composition api -->
<script src="https://cdn.jsdelivr.net/npm/@vue/composition-api@1.4.9"></script>

<!-- vee-validate -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vee-validate/3.4.14/vee-validate.full.min.js"></script>

<!-- aotterclam-ui-vue-core -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/@aotter/aotterclam-ui-vue-core/dist/core.global.js"
></script>

<!-- aotterclam-ui-vue-bootstrap -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/@aotter/aotterclam-ui-vue-bootstrap/dist/bootstrap.global.js"
></script>
```

2. Setting vee-validate

```html
<script>
  const {
    ValidationObserver,
    ValidationProvider,
    Rules: rules,
    extend
  } = VeeValidate

  // Register all rules
  for (const [rule, validation] of Object.entries(rules)) {
    extend(rule, {
      ...validation
    })
  }

  // Register the component globally.
  Vue.component('ValidationObserver', ValidationObserver)
  Vue.component('ValidationProvider', ValidationProvider)
</script>
```

3. Running app

```html
<script>
  const { createApp, ref, computed } = VueCompositionAPI

  createApp({
    components: {
      ClamForm: AotterClamUiBootstrap.ClamForm
    },
    setup() {
      const formData = ref({})
      const fields = computed(() => [
        {
          name: 'name',
          label: '姓名',
          contentType: 'string',
          component: 'Input',
          description: '輸入姓名，最多 20 個字',
          placeholder: '王大明',
          rules: 'required',
          inputTagAttrs: {
            maxlength: 20
          }
        },
        {
          name: 'email',
          label: 'Email',
          contentType: 'email',
          component: 'Input',
          description: '輸入您的 Email',
          placeholder: 'john.doe@gmail.com',
          rules: 'required|email',
          inputTagAttrs: {
            maxlength: 20
          }
        },
        {
          name: 'height',
          label: '身高',
          contentType: 'number',
          component: 'Input',
          description: '輸入身高 (cm)',
          inputTagAttrs: {
            min: 100,
            max: 300,
            step: 0.1
          }
        }
      ])

      return {
        formData,
        fields
      }
    }
  }).mount('#app')
</script>
```
