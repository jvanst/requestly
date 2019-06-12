import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'

import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/registerServiceWorker'
import '@/misc/handle-apple-install'
import 'pwacompat'

import './filters/string'
import './filters/date'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('render-event'))
}).$mount('#app')
