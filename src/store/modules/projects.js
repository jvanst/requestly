import firebase from 'firebase/app'
import 'firebase/auth'

import ProjectAPI from '@/api/projects'
import globalModule from './module/'
// import snackbar from '@/helpers/snackbar'

const state = {
  activeId: null
}

const actions = {
  async fetch (context, uid) {
    try {
      const result = await new ProjectAPI(context.rootState.projects.activeId).fetch(firebase.auth().currentUser.uid)
      context.commit('SET', result)
    } catch (error) {
      // snackbar.showSnackbar(error.message, 'error')
    }
  }
}

const mutations = {
  SET_ACTIVE (state, id) {
    state.activeId = id
  }
}

export default globalModule('projects', { state, actions, mutations })
