import firebase from 'firebase/app'
import 'firebase/firestore'

import router from '@/router'

const state = {
  user: {},
  isLoggedIn: false
}

const actions = {
  async register (context, { email, password, displayName }) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = firebase.auth().currentUser
      await user.updateProfile({ displayName, photoURL: null })
      router.replace('/dashboard')
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async login (context, { email, password }) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      router.replace('/dashboard')
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async loginWithGoogle (context) {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      router.replace('/dashboard')
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async loginWithFacebook (context) {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
      router.replace('/dashboard')
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
      router.replace('/login')
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
      router.replace('/login')
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
