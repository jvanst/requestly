import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/api/users'

import uiModule from './modules/ui'
import usersModule from './modules/user'
import formsModule from './modules/forms'
import pipelineModule from './modules/pipelines'
import requestModule from './modules/requests'
import labelsModule from './modules/labels'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {},
    role: null
  },
  actions: {
    fetchUser ({ commit, state }) {
      return api.fetchById(state.user.uid)
        .then((user) => commit('SET_ROLE', user.role))
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
  },
  mutations: {
    SET_USER (state, value) {
      state.user = value
    },
    SET_LOGGEDIN (state, value) {
      state.isLoggedIn = value
    },
    SET_ROLE (state, value) {
      state.role = value

      if (value === 'admin') {
        state.admin = true
      }
    }
  },
  modules: {
    ui: uiModule,
    users: usersModule,
    forms: formsModule,
    pipelines: pipelineModule,
    requests: requestModule,
    labels: labelsModule
  }
})
