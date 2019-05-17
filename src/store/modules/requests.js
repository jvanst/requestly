import _getters from './_getters'
import _actions from './_actions'
import _mutations from './_mutations'

export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    ..._getters,
    getByPipelineId: state => id => state.data.filter(r => r.pipelineId === id)
  },
  actions: {
    ..._actions('pipelines')
  },
  mutations: {
    ..._mutations
  }
}
