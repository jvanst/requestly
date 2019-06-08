import firebase from 'firebase/app'

import store from '@/store/store'

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('SET_USER', {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      email: user.email
    })
    store.commit('SET_LOGGEDIN', true)
  } else {
    store.commit('SET_USER', {})
    store.commit('SET_LOGGEDIN', false)
  }
})
