import api from '@/api/pipelines'

const state = {
  data: []
}

const getters = {
  getById: state => id => state.data.find(r => r.id === id)
}

const actions = {
  fetch ({ commit }) {
    return api.fetch()
      .then(result => commit('SET', result))
  },
  create ({ commit, state }, title) {
    return api.create({
      title,
      order: state.data.length
    })
      .then(result => commit('ADD', result))
  },
  update ({ commit }, { id, payload }) {
    return api.update([{ id, ...payload }])
      .then(() => commit('UPDATE', { id, ...payload }))
  },
  updateBatch ({ state }) {
    return api.update(state.data)
  },
  delete ({ commit }, id) {
    return api.delete(id).then(() => commit('DELETE', id))
  }
}

const mutations = {
  SET (state, value) {
    state.data = value
  },
  ADD (state, value) {
    state.data.push(value)
  },
  UPDATE (state, payload) {
    state.data.splice(state.data.findIndex(p => p.id === payload.id), 1, payload)
  },
  DELETE (state, id) {
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
  getters,
  actions,
  mutations
}
