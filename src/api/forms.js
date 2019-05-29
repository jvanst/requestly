import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './Endpoint'

export default class Forms extends Endpoint {
  constructor (projectId) {
    super(firebase.firestore()
      .collection('projects')
      .doc(projectId)
      .collection('forms'))
  }
}
