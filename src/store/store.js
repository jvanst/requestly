import Vue from 'vue'
import Vuex from 'vuex'

import globalModule from './modules/module/'
import projects from './modules/projects'
import pipelines from './modules/pipelines'
import requests from './modules/requests'
import permissions from './modules/permissions'
import timeline from './modules/timeline'

import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    projects,
    users: globalModule('users'),
    invites: globalModule('invites'),
    labels: globalModule('labels'),
    forms: globalModule('forms'),
    permissions,
    pipelines,
    requests,
    timeline,
    auth
  },
  state: {
    snackbar: {
      visible: false,
      message: '',
      color: 'info'
    },
    ui: {
      dark: JSON.parse(localStorage.getItem('dark'))
    }
  },
  mutations: {
    SET_DARK (state, value) {
      state.ui.dark = value
      localStorage.setItem('dark', value)
    },
    SHOW_SNACKBAR (state, { message, color }) {
      state.snackbar.visible = false
      state.snackbar.message = message
      state.snackbar.color = color
      state.snackbar.visible = true
    }
  }
})
