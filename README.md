# AotterClam UI Vue

- For packaging, I followed instruction of https://blog.harveydelaney.com/creating-your-own-vue-component-library/

- Currently this project is private.

- use node 14 for development

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
- password: generate a github personal access token with `repo` and `read:packages` privilege

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
import Vue from 'vue'
import { ClamForm } from '@aotter/aotterclam-ui-vue'
import { IClamFormField } from '@aotter/aotterclam-ui-vue/lib/types'
export default Vue.extend({
  components: {
    ClamForm
  },
  data() {
    return {
      formData: {},
      fields: [
        {
          name: 'title',
          label: '標題',
          contentType: 'string',
          formTagType: 'Input',
          description: '資料的標題',
          rules: 'required'
        }
      ] as IClamFormField[]
    }
  }
})
</script>
```

# Develop

## Install pnpm

This project uses [pnpm](https://pnpm.io/) as package manager, and [pnpm workspace](https://pnpm.io/workspaces) as monorepo structure base. Please make sure you've installed pnpm.

```bash
npm i -g pnpm
```

or via homebrew (Mac user)

```bash
brew install pnpm
```

## Install dependencies

```bash
pnpm install --frozen-lockfile
```

## Install dependency at root

```
pnpm add -w <pkg>
```

## Install dependency at specific package

```
pnpm -F <package_selector> add <pkg>
```
