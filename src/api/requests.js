import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './Endpoint'

export default class Labels extends Endpoint {
  constructor (projectId) {
    super(firebase.firestore()
      .collection('projects')
      .doc(projectId)
      .collection('requests'))
  }
  async fetch () {
    const data = []
    const result = await this.ref.orderBy('createdOn').where('closed', '==', false).get()
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
