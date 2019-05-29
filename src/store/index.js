import Vue from 'vue'
import Vuex from 'vuex'

import Module from './module/'
import projects from './projects'
import pipelines from './pipelines'
import requests from './requests'
import permissions from './permissions'
import timeline from './timeline'

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
    users: Module('users'),
    invites: Module('invites'),
    labels: Module('labels'),
    forms: Module('forms'),
    permissions,
    pipelines,
    requests,
    timeline
  }
})
