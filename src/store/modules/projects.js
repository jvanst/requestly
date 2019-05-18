import firebase from 'firebase/app'
import 'firebase/auth'

import ProjectsAPI from '@/api/projects'
import _module from './_module'
import snackbar from '@/helpers/snackbar'

const state = {
  activeId: null
}

const actions = {
  async fetch (context, uid) {
    try {
      const result = await new ProjectsAPI(context.rootState.projects.activeId).fetch(firebase.auth().currentUser.uid)
      context.commit('SET', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
}

const mutations = {
  SET_ACTIVE (state, id) {
    state.activeId = id
  }
}

export default _module('projects', { state, actions, mutations })
