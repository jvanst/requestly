import firestore from '@/firebase/firestore'

import Endpoint from './Endpoint'

export default class PermissionAPI extends Endpoint {
  constructor (projectId) {
    super(async () =>
      (await firestore())
        .collection('projects')
        .doc(projectId)
        .collection('permissions'))
  }
}
