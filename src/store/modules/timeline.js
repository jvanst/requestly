import _module from './_module'

const getters = {
  getComments: state => id => state.data.filter(e => e.type === 'comment') || []
}

export default _module('timeline', { getters })
