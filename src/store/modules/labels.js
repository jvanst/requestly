import firebase from 'firebase/app'
import 'firebase/firestore'

const labelsRef = firebase.firestore().collection('labels')

const state = {
  data: [],
  fetched: false
}

const getters = {
  getById: state => id => state.data.find(r => r.id === id)
}

const actions = {
  async fetch ({ commit }) {
    const result = await labelsRef.get()

    let data = []
    for (let request of result.docs) {
      data.push({
        id: request.id,
        ...request.data()
      })
    }
    commit('SET_LABELS', data)
    commit('SET_FETCHED', true)
  },
  async create ({ commit }, payload) {
    const result = await labelsRef.add(payload)
    commit('ADD_LABEL', { id: result.id, ...payload })
  },
  async update ({ commit }, { id, payload }) {
    // Merge the new payload object with existing data
    const newObject = { ...state.data.find(p => p.id === id), ...payload }
    delete newObject.id

    await labelsRef.doc(id).set(newObject)

    newObject.id = id
    commit('UPDATE_LABEL', newObject)
  },
  async delete ({ commit }, id) {
    await labelsRef.doc(id).delete()
    commit('DELETE_LABEL', id)
  }
}

const mutations = {
  SET_LABELS (state, value) {
    state.data = value
  },
  SET_FETCHED (state, value) {
    state.fetched = value
  },
  ADD_LABEL (state, request) {
    state.data.push(request)
  },
  UPDATE_LABEL (state, payload) {
    state.data.splice(state.data.findIndex(p => p.id === payload.id), 1, payload)
  },
  DELETE_LABEL (state, id) {
    state.data.splice(state.data.findIndex(p => p.id === id), 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
