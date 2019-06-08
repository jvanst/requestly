import firestore from '@/firebase/firestore'

import Endpoint from './Endpoint'

export default class FormAPI extends Endpoint {
  constructor (projectId) {
    super(async () => {
      const collection = (await firestore())
        .collection('projects')
        .doc(projectId)
        .collection('forms')
      return collection
    })
  }
}
