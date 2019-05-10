import api from '@/api/users'

const state = {
  isLoggedIn: false,
  data: {},
  user: {}
}

const actions = {
  fetchById ({ commit }, id) {
    return api.fetchById(id)
  },
  fetch ({ commit, state }) {
    return api.fetchById(state.data.uid)
      .then((user) => commit('SET_USER_2', user))
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
  SET_USER_2 (state, value) {
    state.user = value
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
