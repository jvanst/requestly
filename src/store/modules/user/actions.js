import firebase from 'firebase/app'
import 'firebase/auth'

export default {
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
