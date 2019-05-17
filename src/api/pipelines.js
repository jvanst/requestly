import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './_EndPoint'

export default class Labels extends Endpoint {
  constructor (projectId) {
    super(firebase.firestore()
      .collection('projects')
      .doc(projectId)
      .collection('pipelines'))
  }
}
