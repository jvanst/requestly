import api from '@/api/forms'

const state = {
  data: []
}

const getters = {
  getById: state => id => state.data.find(r => r.id === id)
}

const actions = {
  fetchById ({ commit }, id) {
    return api.fetchById(id)
      .then((result) => commit('ADD', result))
  },
  fetch ({ commit }) {
    return api.fetch()
      .then((result) => commit('SET', result))
  },
  create ({ commit }, payload) {
    return api.create(payload)
      .then((result) => commit('ADD', result))
  },
  update ({ commit }, { id, payload }) {
    return api.update({ id, payload })
      .then(() => commit('UPDATE', { id, ...payload }))
  },
  delete ({ commit }, id) {
    return api.delete(id)
      .then(() => commit('DELETE'))
  }
}

const mutations = {
  SET (state, value) {
    state.data = value
  },
  ADD (state, request) {
    state.data.push(request)
  },
  UPDATE (state, payload) {
    state.data.splice(state.data.findIndex(p => p.id === payload.id), 1, payload)
  },
  DELETE (state, id) {
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
