
import firebase from 'firebase/app'
import 'firebase/firestore'

const pipelineRef = firebase.firestore().collection('pipelines')

const state = {
  data: [],
  fetched: false
}

const actions = {
  async fetch ({ commit }) {
    const result = await pipelineRef.orderBy('order').get()

    let data = []
    for (let pipeline of result.docs) {
      data.push({
        id: pipeline.id,
        ...pipeline.data()
      })
    }
    commit('SET_PIPELINES', data)
    commit('SET_FETCHED', true)
  },
  async create ({ commit, state }, title) {
    const order = state.data.length
    const result = await pipelineRef.add({ title, order })
    commit('ADD_PIPELINE', { id: result.id, title, order })
  },
  async update ({ commit }, { id, payload }) {
    // Merge the new payload object with existing data
    const newObject = { ...state.data.find(p => p.id === id), ...payload }
    delete newObject.id

    await pipelineRef.doc(id).set(newObject)

    newObject.id = id
    commit('UPDATE_PIPELINE', newObject)
  },
  // updateBatch sets the remote state equal to local
  async updateBatch ({ commit, state }) {
    const batch = firebase.firestore().batch()

    state.data.forEach((p) => {
      const doc = { ...p }
      delete doc.id
      const ref = pipelineRef.doc(p.id)
      batch.set(ref, doc)
    })

    await batch.commit()
  },
  async delete ({ commit }, id) {
    await pipelineRef.doc(id).delete()
    commit('DELETE_PIPELINE', id)
  }
}

const mutations = {
  SET_FETCHED (state, value) {
    state.fetched = value
  },
  SET_PIPELINES (state, value) {
    state.data = value
  },
  ADD_PIPELINE (state, value) {
    state.data.push(value)
  },
  UPDATE_PIPELINE (state, payload) {
    state.data.splice(state.data.findIndex(p => p.id === payload.id), 1, payload)
  },
  DELETE_PIPELINE (state, id) {
    state.data.splice(state.data.findIndex(p => p.id === id), 1)
  },
  UPDATE_ORDER (state, newOrder = []) {
    newOrder.forEach((p, index) => { // Fix order property
      p.order = index
    })
    state.data = newOrder // Set new order
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
