// Initialize firebase first
import firebase from 'firebase/app'
import 'firebase/auth'
import './firebase'

import Vue from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import router from './router'

import store from './store/store'
import vuetify from './plugins/vuetify'

import './filters/string'
import './filters/date'

import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueHead)

new Vue({
  vuetify,
  store,
  router,
  created () {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('SET_USER', {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email
        })
        this.$store.commit('SET_LOGGEDIN', true)
      } else {
        this.$store.commit('SET_USER', {})
        this.$store.commit('SET_LOGGEDIN', false)
      }
    })
  },
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('render-event'))
}).$mount('#app')
