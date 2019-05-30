import globalModule from './module/'

const getters = {
  getComments: state => state.data.filter(e => e.type === 'comment')
}

export default globalModule('timeline', { getters })
