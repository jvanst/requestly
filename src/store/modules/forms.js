import firebase from 'firebase/app'
import 'firebase/firestore'

const formsRef = firebase.firestore().collection('forms')

const state = {
  data: [],
  fetched: false
}

const getters = {
  getById: state => id => state.data.find(r => r.id === id)
}

const actions = {
  async fetchById ({ commit }, id) {
    const result = await formsRef.doc(id).get()
    commit('SET_FORMS', [{
      id: result.id,
      ...result.data()
    }])
  },
  async fetch ({ commit }) {
    const result = await formsRef.get()

    let data = []
    for (let request of result.docs) {
      data.push({
        id: request.id,
        ...request.data()
      })
    }
    commit('SET_FORMS', data)
    commit('SET_FETCHED', true)
  },
  async create ({ commit }, payload) {
    const result = await formsRef.add(payload)
    commit('ADD_FORM', { id: result.id, ...payload })
  },
  async update ({ commit }, { id, payload }) {
    // Merge the new payload object with existing data
    const newObject = { ...state.data.find(p => p.id === id), ...payload }
    delete newObject.id

    await formsRef.doc(id).set(newObject)

    newObject.id = id
    commit('UPDATE_FORM', newObject)
  },
  async delete ({ commit }, id) {
    await formsRef.doc(id).delete()
    commit('DELETE_FORM', id)
  }
}

const mutations = {
  SET_FETCHED (state, value) {
    state.fetched = value
  },
  SET_FORMS (state, value) {
    state.data = value
  },
  ADD_FORM (state, request) {
    state.data.push(request)
  },
  UPDATE_FORM (state, payload) {
    state.data.splice(state.data.findIndex(p => p.id === payload.id), 1, payload)
  },
  DELETE_FORM (state, id) {
    state.data.splice(state.data.findIndex(p => p.id === id), 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
