import Vue from 'vue'
import VueSwal from 'vue-swal'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';
import VueTheMask from 'vue-the-mask'
//const VueSwal = require('vue-swal');
Vue.config.productionTip = false

Vue.use(VueSwal)
Vue.use(VueKatex)
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'fa'
})
Vue.use(VueTheMask)
new Vue({
  router,
  store,
  VueSwal,
  vuetify,
  render: h => h(App)
}).$mount('#app')
