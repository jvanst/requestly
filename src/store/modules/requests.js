import _module from './_module'

const getters = {
  getByPipelineId: state => id => state.data.filter(r => r.pipelineId === id)
}

export default _module('requests', { getters })
