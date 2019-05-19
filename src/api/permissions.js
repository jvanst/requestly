import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './_endpoint'

export default class PermissionAPI extends Endpoint {
  constructor (projectId) {
    super(firebase.firestore()
      .collection('projects')
      .doc(projectId)
      .collection('permissions'))
  }
}