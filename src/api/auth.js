import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './Endpoint'

// import snackbar from '@/helpers/snackbar'

class AuthAPI extends Endpoint {
  constructor (projectId) {
    super(firebase.firestore()
      .collection('user'))
  }
}

export default new AuthAPI()
