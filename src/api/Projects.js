import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './_endpoint'

class ProjectAPI extends Endpoint {
  constructor () {
    super(firebase.firestore().collection('projects'))
  }
}

export default new ProjectAPI()
