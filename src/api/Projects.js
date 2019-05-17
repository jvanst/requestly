import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './_EndPoint'

class ProjectAPI extends Endpoint {
  constructor () {
    super(firebase.firestore().collection('projects'))
  }
}

export default new ProjectAPI()
