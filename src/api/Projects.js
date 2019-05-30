import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './Endpoint'

export default class ProjectAPI extends Endpoint {
  constructor () {
    super(firebase.firestore().collection('projects'))
  }
  async fetchById (id) {
    const result = await this.ref.doc(id).get()
    return { ...result.data(), id }
  }
  async fetch (uid) {
    const data = []
    const projectIds = []

    const permissions = await firebase.firestore().collectionGroup('permissions').where('uid', '==', uid).get()
    // Get array of project ids
    for (let project of permissions.docs) {
      projectIds.push(project.data().projectId)
    }

    projectIds.forEach(id => {
      this.ref.doc(id).get()
        .then(project => {
          data.push({
            ...project.data(),
            id: project.id
          })
        })
    })
    return data
  }
}
