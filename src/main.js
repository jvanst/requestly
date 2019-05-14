// Initialize firebase first
import firebase from 'firebase/app'
import 'firebase/auth'
import './firebase'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import vuetify from './plugins/vuetify'

import './helpers/registerServiceWorker'
import './helpers/snackbar'

import './filters/string'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeCreate () {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('SET_LOGGEDIN', true)
        this.$store.commit('SET_USER', {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email
        })
        this.$store.dispatch('fetchUser')
      } else {
        this.$store.commit('SET_LOGGEDIN', false)
        this.$store.commit('SET_USER', {})
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
