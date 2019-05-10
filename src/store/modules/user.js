import api from '@/api/users'

const state = {
  isLoggedIn: false,
  data: {}
}

const actions = {
  fetchById ({ commit }, id) {
    return api.fetchById(id)
  },
  register ({ commit }, { email, password, displayName }) {
    return api.register(email, password, displayName)
  },
  login ({ commit }, { email, password }) {
    return api.login(email, password)
  },
  loginWithGoogle ({ commit }) {
    return api.loginWithGoogle()
  },
  logout ({ commit }) {
    return api.logout()
  },
  recover ({ commit }, email) {
    return api.recover(email)
  }
}

const mutations = {
  SET_USER (state, value) {
    state.data = value
  },
  SET_LOGGEDIN (state, value) {
    state.isLoggedIn = value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
