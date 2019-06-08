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
    sw: {
      SWRegistrationForNewContent: null
    },
    snackbar: {
      visible: false,
      message: '',
      color: 'info'
    },
    ui: {
      dark: JSON.parse(localStorage.getItem('dark')),
      mobileMenu: false,
      showAppleInstallPrompt: false
    }
  },
  mutations: {
    TOGGLE_MOBILE_MENU (state) {
      state.ui.mobileMenu = !state.ui.mobileMenu
    },
    SET_DARK (state, value) {
      state.ui.dark = value
      localStorage.setItem('dark', value)
    },
    SHOW_SNACKBAR (state, { message, color }) {
      state.snackbar.visible = false
      state.snackbar.message = message
      state.snackbar.color = color
      state.snackbar.visible = true
    },
    SHOW_APPLE_INSTALL_PROMPT (state, value) {
      state.ui.showAppleInstallPrompt = value
    },
    SET_SW_FOR_NEW_CONTENT (state, value) {
      state.SWRegistrationForNewContent = value
    }
  }
})
