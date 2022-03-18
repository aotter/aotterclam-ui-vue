<template>
  <div class="p-4">
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="tab in tabs" :key="tab.value">
        <a
          class="nav-link"
          href="#"
          :class="{ active: tab.value === type }"
          @click="type = tab.value"
        >
          {{ tab.label }}
        </a>
      </li>
    </ul>

    <div class="container">
      <div class="row mt-5">
        <div class="col col-md-8 col-xs-12">
          <clam-form
            class="foo"
            v-model="formData"
            :fields="fields"
            :key="type"
          >
          </clam-form>
        </div>
        <div class="col col-md-4 col-xs-12">{{ formData }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const formData = ref({})
    const type = ref('basic')
    const tabs = reactive([
      { label: 'Basic', value: 'basic' },
      { label: 'Nested', value: 'nested' }
    ])
    const basicScheme = [
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

    const nestedScheme = [
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
        name: 'gg',
        label: 'gg',
        contentType: 'Object',
        component: 'NestedObject',
        settings: {
          bgVariant: 'light'
        },
        fields: [
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
            name: 'qq',
            label: 'qq',
            contentType: 'Object',
            component: 'NestedObject',
            settings: {
              borderVariant: 'success'
            },
            fields: [
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
              }
            ]
          }
        ]
      },
      {
        name: 'list',
        label: '列表',
        contentType: 'Array',
        component: 'NestedList',
        getTitle: (data: any, index: number) => `${index + 1}. ${data.name}`,
        settings: {
          create: {
            variant: 'outline-primary',
            titleHtml: `<i class="bi bi-plus-lg"></i> 新增列表`
          },
          modal: {
            titleCreate: '新增列表',
            titleUpdate: (data: any) => data.name,
            ok: {
              titleHtml: '<i class="bi bi-check-lg"></i> 確認'
            },
            cancel: {
              titleHtml: '<i class="bi bi-x-lg"></i> 取消'
            }
          }
        },
        fields: [
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
            name: 'listn',
            label: '列表',
            contentType: 'Array',
            component: 'NestedList',
            fields: [
              {
                name: 'name',
                label: '姓名',
                contentType: 'string',
                component: 'INPUT',
                description: '輸入姓名，最多 20 個字',
                placeholder: '王大明',
                rules: 'required',
                inputTagAttrs: {
                  maxlength: 20
                }
              }
            ]
          }
        ]
      }
    ]
    const fields = computed(() => {
      switch (type.value) {
        case 'basic':
          return basicScheme
        case 'nested':
          return nestedScheme
        default:
          return basicScheme
      }
    })

    return {
      formData,
      type,
      tabs,
      fields
    }
  }
})
</script>
