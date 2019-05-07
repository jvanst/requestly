import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  'apiKey': 'AIzaSyABSb8kJ2guZL4EPSeuyUO-L_ZMli-Hf-Q',
  'authDomain': 'request-ly.firebaseapp.com',
  'databaseURL': 'https://request-ly.firebaseio.com',
  'projectId': 'request-ly',
  'storageBucket': 'request-ly.appspot.com',
  'messagingSenderId': '226407229795'
}

firebase.initializeApp(config)

firebase.firestore().enablePersistence()
  .catch((err) => {
    console.log(err)
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

export default firebase
