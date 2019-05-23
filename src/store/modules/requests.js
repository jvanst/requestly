import _module from './_module'

const state = {
  activeId: null
}

const getters = {
  getByPipelineId: state => id => state.data.filter(r => r.pipelineId === id)
}

const mutations = {
  SET_ACTIVE (state, id) {
    state.activeId = id
  }
}

export default _module('requests', { state, getters, mutations })
