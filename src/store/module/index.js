import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default (resource, Module = {}) => ({
  state: Object.assign({ data: [] }, Module.state),
  getters: Object.assign(getters, Module.getters),
  actions: Object.assign(actions(resource), Module.actions),
  mutations: Object.assign(mutations, Module.mutations),
  namespaced: true || Module.namespaced
})
