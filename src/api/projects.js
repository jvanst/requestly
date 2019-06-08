import firestore from '@/firebase/firestore'

import Endpoint from './Endpoint'

export default class ProjectAPI extends Endpoint {
  constructor () {
    super(async () => (await firestore()).collection('projects'))
  }
  async fetchById (id) {
    const result = await (await firestore()).collection('projects').doc(id).get()
    return { ...result.data(), id }
  }
  async fetch (uid) {
    const data = []
    const projectIds = []
    const permissions = await (await firestore()).collectionGroup('permissions').where('uid', '==', uid).get()

    // Get array of project ids
    for (let project of permissions.docs) {
      projectIds.push(project.data().projectId)
    }

    projectIds.forEach(id => {
      firestore()
        .then(ref => ref.collection('projects').doc(id).get()
          .then(project => {
            data.push({
              ...project.data(),
              id: project.id
            })
          }))
    })
    return data
  }
}
