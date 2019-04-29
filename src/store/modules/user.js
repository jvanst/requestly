import firebase from 'firebase/app'
import 'firebase/auth'

const state = {
  isLoggedIn: false,
  data: {}
}

const actions = {
  async register ({ commit }, { email, password, displayName }) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)

    const user = firebase.auth().currentUser
    await user.updateProfile({ displayName, photoURL: null })
  },
  async login ({ commit }, { email, password }) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  },
  async loginWithGoogle ({ commit }) {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  async logout ({ commit }) {
    await firebase.auth().signOut()
  },
  async recover ({ commit }, email) {
    await firebase.auth().sendPasswordResetEmail(email)
  }
}

const mutations = {
  SET_USER (state, value) {
    state.data = value
  },
  SET_LOGGEDIN (state, value) {
    state.isLoggedIn = value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
