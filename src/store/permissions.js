import globalModule from './module/index'

const getters = {
  isUserAdmin: (state, getters) => uid => {
    const permissions = getters.getById(uid)

    if (!permissions) {
      return false
    }
    if (permissions && permissions.role === 'admin') {
      return true
    }
    return false
  }
}

export default globalModule('permissions', { getters })
