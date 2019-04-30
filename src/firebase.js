import firebase from 'firebase/app'

const config = {
  'apiKey': 'AIzaSyABSb8kJ2guZL4EPSeuyUO-L_ZMli-Hf-Q',
  'authDomain': 'request-ly.firebaseapp.com',
  'databaseURL': 'https://request-ly.firebaseio.com',
  'projectId': 'request-ly',
  'storageBucket': 'request-ly.appspot.com',
  'messagingSenderId': '226407229795'
}

firebase.initializeApp(config)

export default firebase
