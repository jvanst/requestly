import firebase from 'firebase/app'
import 'firebase/auth'

import router from '@/router'

function redirect () {
  if (router.history.current.query.redirect) {
    return router.replace(router.currentRoute.query.redirect)
  }
  router.go({ name: 'Dashboard' })
}

const state = {
  user: null,
  isLoggedIn: false
}

const actions = {
  async register (context, { email, password, displayName }) {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = firebase.auth().currentUser
      await user.updateProfile({ displayName, photoURL: null })
      redirect()
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async login (context, { email, password }) {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      await firebase.auth().signInWithEmailAndPassword(email, password)
      redirect()
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async loginWithGoogle (context) {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      redirect()
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async loginWithFacebook (context) {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
      redirect()
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async logout (context) {
    try {
      await firebase.auth().signOut()
      router.replace({ name: 'Login' })
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async recover (context, email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      router.replace({ name: 'Login' })
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  }
}

const mutations = {
  SET_USER (state, value) {
    state.user = value
  },
  SET_LOGGEDIN (state, value) {
    state.isLoggedIn = value
  }
}

export default {
  state,
  actions,
  mutations
}
