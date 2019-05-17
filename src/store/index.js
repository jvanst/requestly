import Vue from 'vue'
import Vuex from 'vuex'

import _module from './modules/_module'
import pipelines from './modules/pipelines'
import requests from './modules/requests'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    project: {},
    ui: {
      dark: JSON.parse(localStorage.getItem('dark'))
    },
    user: {}
  },
  mutations: {
    SET_USER (state, value) {
      state.user = value
    },
    SET_DARK (state, value) {
      state.ui.dark = value
      localStorage.setItem('dark', value)
    },
    SET_PROJECT (state, value) {
      state.project = value
    }
  },
  modules: {
    projects: _module('projects'),
    labels: _module('labels'),
    forms: _module('forms'),
    pipelines,
    requests
  }
})
