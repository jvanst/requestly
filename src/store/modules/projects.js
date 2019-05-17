import _module from './_module'

const state = {
  activeId: null
}
const mutations = {
  SET_ACTIVE (state, id) {
    state.activeId = id
  }
}

export default _module('projects', { state, mutations })
