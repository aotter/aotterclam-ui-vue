import Vue from 'vue'
import App from './App.vue'
import { ClamForm } from '@aotter/aotterclam-ui-vue-bootstrap'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VueCompositionAPI from '@vue/composition-api'
import '@aotter/aotterclam-ui-vue-bootstrap/node_modules/bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false
Vue.component('ClamForm', ClamForm)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  render: h => h(App)
}).$mount('#app')
