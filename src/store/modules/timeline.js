import _module from './_module'

const getters = {
  getComments: state => state.data.filter(e => e.type === 'comment')
}

export default _module('timeline', { getters })
