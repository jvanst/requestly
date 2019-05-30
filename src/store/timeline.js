import Module from './module/'

const getters = {
  getComments: state => state.data.filter(e => e.type === 'comment')
}

export default Module('timeline', { getters })
