import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './_endpoint'

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
    const result = await this.ref.where('permissions', 'array-contains', uid).get()
    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  }
}
