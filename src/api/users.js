import firebase from 'firebase/app'
import 'firebase/firestore'
import snackbar from '@/helpers/snackbar'

const ref = firebase.firestore().collection('users')

const fetchById = async (id) => {
  try {
    const result = await ref.doc(id).get()
    return { ...result.data(), id: result.id }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const register = async (email, password, displayName) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = firebase.auth().currentUser
    await user.updateProfile({ displayName, photoURL: null })
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const login = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const loginWithGoogle = async () => {
  try {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const logout = async () => {
  try {
    await firebase.auth().signOut()
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const recover = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

export default {
  fetchById,
  register,
  login,
  loginWithGoogle,
  logout,
  recover
}
