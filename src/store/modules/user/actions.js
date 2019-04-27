import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  async login ({ commit }, { email, password }) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  },
  async loginWithGoogle ({ commit }) {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  async logout ({ commit }) {
    await firebase.auth().signOut()
  }
}
