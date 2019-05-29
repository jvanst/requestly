import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './Endpoint'

export default class TimelineAPI extends Endpoint {
  constructor (projectId, requestId) {
    super(firebase.firestore()
      .collection('projects')
      .doc(projectId)
      .collection('requests')
      .doc(requestId)
      .collection('timeline'))
  }

  async fetch () {
    const data = []
    const result = await this.ref.orderBy('createdOn').get()
    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  }
}
