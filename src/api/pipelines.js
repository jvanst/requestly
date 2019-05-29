import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './Endpoint'

export default class Pipelines extends Endpoint {
  constructor (projectId) {
    super(firebase.firestore()
      .collection('projects')
      .doc(projectId)
      .collection('pipelines'))
  }
  // Override default fetch method
  async fetch () {
    const data = []
    const result = await this.ref.orderBy('order').get()
    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  }
  async updateBatch (pipelines) {
    const batch = firebase.firestore().batch()
    pipelines.forEach((p) => {
      const doc = { ...p }
      delete doc.id
      batch.set(this.ref.doc(p.id), doc)
    })
    await batch.commit()
  }
}
