import _getters from './_getters'
import _actions from './_actions'
import _mutations from './_mutations'

const _module = (name) => ({
  namespaced: true,
  state: {
    data: []
  },
  getters: _getters,
  actions: _actions(name),
  mutations: _mutations
})

export default _module
