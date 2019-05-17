export default class Endpoint {
  constructor (ref) {
    this.ref = ref
  }
  async fetchById (id) {
    const result = await this.ref.doc(id).get()
    return { ...result.data(), id }
  }
  async fetch () {
    const data = []
    const result = await this.ref.get()
    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  }
  async create (payload) {
    const result = await this.ref.add(payload)
    return { ...payload, id: result.id }
  }
  async put (id, payload) {
    await this.ref.doc(id).set(payload)
    return { ...payload, id }
  }
  async delete (id) {
    await this.ref.doc(id).delete()
  }
}
