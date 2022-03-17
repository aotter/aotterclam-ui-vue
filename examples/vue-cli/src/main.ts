import Vue from 'vue'
import App from './App.vue'
import { ClamForm } from '@aotter/aotterclam-ui-vue-bootstrap'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh_TW from 'vee-validate/dist/locale/zh_TW.json'
import VueCompositionAPI from '@vue/composition-api'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueCompositionAPI)
Vue.component('ClamForm', ClamForm)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

localize('zh_TW', zh_TW)

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
