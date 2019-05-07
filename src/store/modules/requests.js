
import api from '@/api/requests'

const state = {
  data: []
}

const getters = {
  getById: state => id => state.data.find(r => r.id === id),
  getByPipelineId: state => id => state.data.filter(r => r.pipelineId === id)
}

const actions = {
  fetchById ({ commit }, id) {
    return api.fetchById(id)
      .then(result => commit('ADD', result))
  },
  fetch ({ commit }) {
    return api.fetch()
      .then(result => commit('SET', result))
  },
  create ({ commit, rootGetters }, { payload, formId }) {
    return api.create({
      ...payload,
      labels: rootGetters['forms/getById'](formId).labels
    })
      .then(result => commit('ADD', result))
  },
  update ({ commit }, { id, payload }) {
    return api.update({ id, payload })
      .then(() => commit('UPDATE', { id, ...payload }))
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
