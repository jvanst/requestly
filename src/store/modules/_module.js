import _getters from './_getters'
import _actions from './_actions'
import _mutations from './_mutations'

export default (resource, _module = {}) => ({
  state: Object.assign({ data: [] }, _module.state),
  getters: Object.assign(_getters, _module.getters),
  actions: Object.assign(_actions(resource), _module.actions),
  mutations: Object.assign(_mutations, _module.mutations),
  namespaced: true || _module.namespaced
})
