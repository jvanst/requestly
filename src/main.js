import Vue from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import router from './router'

import store from './store/store'
import vuetify from './plugins/vuetify'

import './registerServiceWorker'

import '@/firebase/init'
import '@/firebase/authentication'

import './filters/string'
import './filters/date'

Vue.config.productionTip = false

Vue.use(VueHead)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('render-event'))
}).$mount('#app')
