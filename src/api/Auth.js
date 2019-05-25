import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './_endpoint'

import snackbar from '@/helpers/snackbar'

class AuthAPI extends Endpoint {
  constructor (projectId) {
    super(firebase.firestore()
      .collection('user'))
  }
  async register (email, password, displayName) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = firebase.auth().currentUser
      await user.updateProfile({ displayName, photoURL: null })
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
  async login (email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
  async loginWithGoogle () {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
  async loginWithFacebook () {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
  async logout () {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
  async recover (email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
}

export default new AuthAPI()
