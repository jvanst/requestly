import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default (resource, globalModule = {}) => ({
  state: Object.assign({ data: [], loading: false }, globalModule.state),
  getters: Object.assign(getters, globalModule.getters),
  actions: Object.assign(actions(resource), globalModule.actions),
  mutations: Object.assign(mutations, globalModule.mutations),
  namespaced: true || globalModule.namespaced
})
