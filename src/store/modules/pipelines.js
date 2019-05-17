import _module from './_module'

import PipelinesAPI from '@/api/pipelines'

const actions = {
  updateBatch (context) {
    return new PipelinesAPI(context.rootState.projects.activeId).updateBatch(context.state.data)
  }
}
const mutations = {
  UPDATE_ORDER (state, newOrder = []) {
    newOrder.forEach((p, index) => { // Fix order property
      p.order = index
    })
    state.data = newOrder // Set new order
  }
}

export default _module('pipelines', { actions, mutations })
