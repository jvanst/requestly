
import firebase from 'firebase/app'
import 'firebase/firestore'

const pipelineRef = firebase.firestore().collection('pipelines')

const state = {
  data: []
}

const actions = {
  async fetch ({ commit }) {
    const result = await pipelineRef.orderBy('order').get()

    let data = []
    for (let pipeline of result.docs) {
      data.push({
        id: pipeline.id,
        requests: [],
        ...pipeline.data()
      })
    }

    commit('SET_PIPELINES', data)
  },
  async create ({ commit, state }, title) {
    const order = state.data.length
    await pipelineRef.add({ title, order })
    commit('ADD_PIPELINE', { title, order })
  }
}

const mutations = {
  SET_PIPELINES (state, value) {
    state.data = value
  },
  SET_REQUEST_REF (state, { id, ref }) {
    state.data.find(p => p.id === id).requests = ref
  },
  ADD_PIPELINE (state, value) {
    state.data.push(value)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
