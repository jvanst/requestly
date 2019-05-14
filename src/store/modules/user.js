import api from '@/api/users'

const state = {
  user: {}
}

const actions = {
  fetchById ({ commit }, id) {
    return api.fetchById(id)
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
