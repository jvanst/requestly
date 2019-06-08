import firestore from '@/firebase/firestore'

import Endpoint from './Endpoint'

export default class TimelineAPI extends Endpoint {
  constructor (projectId, requestId) {
    super(async () =>
      (await firestore())
        .collection('projects')
        .doc(projectId)
        .collection('requests')
        .doc(requestId)
        .collection('timeline'))

    this.projectId = projectId
    this.requestId = requestId
  }

  async fetch () {
    const data = []
    const result = await (await firestore())
      .collection('projects')
      .doc(this.projectId)
      .collection('requests')
      .doc(this.requestId)
      .collection('timeline')
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
