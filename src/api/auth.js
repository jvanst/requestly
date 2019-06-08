import firestore from '@/firebase/firestore'

import Endpoint from './Endpoint'

// import snackbar from '@/helpers/snackbar'

class AuthAPI extends Endpoint {
  constructor (projectId) {
    super(firestore()
      .collection('user'))
  }
}

export default new AuthAPI()
