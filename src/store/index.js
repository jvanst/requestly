import Vue from 'vue'
import Vuex from 'vuex'

import _module from './modules/_module'
import projects from './modules/projects'
import pipelines from './modules/pipelines'
import requests from './modules/requests'
import permissions from './modules/permissions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ui: {
      dark: JSON.parse(localStorage.getItem('dark'))
    },
    user: {},
    isLoggedIn: false
  },
  mutations: {
    SET_USER (state, value) {
      state.user = value
    },
    SET_LOGGEDIN (state, value) {
      state.isLoggedIn = value
    },
    SET_DARK (state, value) {
      state.ui.dark = value
      localStorage.setItem('dark', value)
    }
  },
  modules: {
    projects,
    users: _module('users'),
    invites: _module('invites'),
    labels: _module('labels'),
    forms: _module('forms'),
    permissions,
    pipelines,
    requests
  }
})
