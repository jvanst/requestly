import firebase from 'firebase/app'
import 'firebase/auth'

export default class Endpoint {
  constructor (collectionRef) {
    this.collectionRef = collectionRef
  }
  async fetchById (id) {
    const result = await (await this.collectionRef()).doc(id).get()
    return { ...result.data(), id }
  }
  async fetch () {
    const data = []
    const result = await (await this.collectionRef()).get()
    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  }
  async create (payload) {
    const result = await (await this.collectionRef()).add({ ...payload, creatorId: firebase.auth().currentUser.uid })
    return { ...payload, id: result.id }
  }
  async put (id, payload) {
    await (await this.collectionRef()).doc(id).set({ ...payload, creatorId: firebase.auth().currentUser.uid })
    return { ...payload, id }
  }
  async delete (id) {
    await (await this.collectionRef()).doc(id).delete()
  }
}
