import Vue from 'vue'
import Vuex from 'vuex'

import globalModule from './module'
import projects from './projects'
import pipelines from './pipelines'
import requests from './requests'
import permissions from './permissions'
import timeline from './timeline'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ui: {
      dark: true
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
    users: globalModule('users'),
    invites: globalModule('invites'),
    labels: globalModule('labels'),
    forms: globalModule('forms'),
    permissions,
    pipelines,
    requests,
    timeline
  }
})
