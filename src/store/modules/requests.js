
import firebase from 'firebase/app'
import 'firebase/firestore'

const requestRef = firebase.firestore().collection('requests')

const state = {
  data: [],
  fetched: false
}

const getters = {
  getById: state => id => state.data.find(r => r.id === id),
  getByPipelineId: state => id => state.data.filter(r => r.pipelineId === id)
}

const actions = {
  async fetchById ({ commit }, id) {
    const result = await requestRef.doc(id).get()
    commit('SET_REQUESTS', [{
      id: result.id,
      ...result.data()
    }])
  },
  async fetch ({ commit }) {
    const result = await requestRef.get()

    let data = []
    for (let request of result.docs) {
      data.push({
        id: request.id,
        ...request.data()
      })
    }
    commit('SET_REQUESTS', data)
    commit('SET_FETCHED', true)
  },
  async create ({ commit }, payload) {
    const result = await requestRef.add(payload)
    commit('ADD_REQUEST', { id: result.id, ...payload })
  },
  async update ({ commit }, { id, payload }) {
    // Merge the new payload object with existing data
    const newObject = { ...state.data.find(p => p.id === id), ...payload }
    delete newObject.id

    await requestRef.doc(id).set(newObject)

    newObject.id = id
    commit('UPDATE_REQUEST', newObject)
  }
}

const mutations = {
  SET_FETCHED (state, value) {
    state.fetched = value
  },
  SET_REQUESTS (state, value) {
    state.data = value
  },
  ADD_REQUEST (state, request) {
    state.data.push(request)
  },
  UPDATE_REQUEST (state, payload) {
    state.data.splice(state.data.findIndex(p => p.id === payload.id), 1, payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
