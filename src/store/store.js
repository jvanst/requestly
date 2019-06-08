import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import auth from './modules/auth'

import projects from './modules/projects'
import pipelines from './modules/pipelines'
import requests from './modules/requests'
import permissions from './modules/permissions'
import timeline from './modules/timeline'

import globalModule from './modules/module/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    auth,
    projects,
    permissions,
    pipelines,
    requests,
    timeline,
    users: globalModule('users'),
    invites: globalModule('invites'),
    labels: globalModule('labels'),
    forms: globalModule('forms')
  },
  state: {
    snackbar: {
      visible: false,
      message: '',
      color: 'info'
    }
  },
  mutations: {
    SHOW_SNACKBAR (state, { message, color }) {
      state.snackbar.visible = false
      state.snackbar.message = message
      state.snackbar.color = color
      state.snackbar.visible = true
    }
  }
})
