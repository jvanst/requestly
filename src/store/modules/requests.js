import RequestsAPI from '@/api/requests'
import globalModule from './module/'
// import snackbar from '@/helpers/snackbar'

const state = {
  activeId: null
}

const getters = {
  getByPipelineId: state => id => state.data.filter(r => r.pipelineId === id && r.closed === false)
}

const actions = {
  async fetchAll (context, uid) {
    try {
      const result = await new RequestsAPI(context.rootState.projects.activeId).fetchAll()
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

export default globalModule('requests', { state, getters, mutations, actions })
