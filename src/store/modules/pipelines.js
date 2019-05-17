import _getters from './_getters'
import _actions from './_actions'
import _mutations from './_mutations'

import PipelinesAPI from '@/api/Pipelines'

export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    ..._getters
  },
  actions: {
    ..._actions('pipelines'),
    updateBatch (context) {
      return new PipelinesAPI(context.rootState.project.id).updateBatch(context.state.data)
    }
  },
  mutations: {
    ..._mutations,
    UPDATE_ORDER (state, newOrder = []) {
      newOrder.forEach((p, index) => { // Fix order property
        p.order = index
      })
      state.data = newOrder // Set new order
    }
  }
}
