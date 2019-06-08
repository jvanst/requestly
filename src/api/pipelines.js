import firestore from '@/firebase/firestore'

import Endpoint from './Endpoint'

export default class PipelineAPI extends Endpoint {
  constructor (projectId) {
    super(async () =>
      (await firestore())
        .collection('projects')
        .doc(projectId)
        .collection('pipelines'))

    this.projectId = projectId
  }
  // Override default fetch method
  async fetch () {
    const data = []
    const result = await (await firestore())
      .collection('projects')
      .doc(this.projectId)
      .collection('pipelines')
      .orderBy('order').get()
    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  }
  async updateBatch (pipelines) {
    const batch = firestore().batch()
    pipelines.forEach((p) => {
      const doc = { ...p }
      delete doc.id
      batch.set(this.ref.doc(p.id), doc)
    })
    await batch.commit()
  }
}
