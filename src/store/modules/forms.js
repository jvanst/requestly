import firebase from 'firebase/app'
import 'firebase/firestore'

const formsRef = firebase.firestore().collection('forms')

const state = {
  data: []
}

const actions = {
  async fetch ({ commit }) {
    const result = await formsRef.get()

    let data = []
    for (let request of result.docs) {
      data.push({
        id: request.id,
        ...request.data()
      })
    }
    commit('SET_TYPES', data)
    commit('SET_FETCHED', true)
  },
  async create ({ commit }, payload) {
    const result = await formsRef.add(payload)
    commit('ADD_TYPE', { id: result.id, ...payload })
  }
}

const mutations = {
  SET_FETCHED (state, value) {
    state.fetched = value
  },
  SET_TYPES (state, value) {
    state.data = value
  },
  ADD_TYPE (state, request) {
    state.data.push(request)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
