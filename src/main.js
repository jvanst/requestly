// Initialize firebase first
import firebase from 'firebase/app'
import './firebase'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import App from './App.vue'
import router from './router'
import store from './store/'

import './helpers/registerServiceWorker'
import './helpers/snackbar'

import 'vuetify/src/styles/main.sass'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.filter('capitalizeFirstLetter', s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
})

new Vue({
  router,
  store,
  vuetify: new Vuetify({}),
  beforeCreate () {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('user/SET_LOGGEDIN', true)
        this.$store.commit('user/SET_USER', user)
      } else {
        this.$store.commit('user/SET_LOGGEDIN', false)
        this.$store.commit('user/SET_USER', {})
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
