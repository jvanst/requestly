import Vue from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import router from './router'

import store from './store/store'
import vuetify from './plugins/vuetify'

import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/registerServiceWorker'
import '@/misc/handle-apple-install'

import './filters/string'
import './filters/date'

Vue.config.productionTip = false

Vue.use(VueHead)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
