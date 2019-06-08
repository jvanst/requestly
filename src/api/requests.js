import firestore from '@/firebase/firestore'

import Endpoint from './Endpoint'

export default class RequestAPI extends Endpoint {
  constructor (projectId) {
    super(async () =>
      (await firestore())
        .collection('projects')
        .doc(projectId)
        .collection('requests'))

    this.projectId = projectId
  }
  async fetch () {
    const data = []
    const result = await (await firestore())
      .collection('projects')
      .doc(this.projectId)
      .collection('requests')
      .orderBy('createdOn')
      .where('closed', '==', false)
      .get()

    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  }
  async fetchAll () {
    const data = []
    const result = await (await firestore())
      .collection('projects')
      .doc(this.projectId)
      .collection('requests')
      .orderBy('createdOn')
      .get()

    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  }
}
