import _module from './_module'

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

export default _module('permissions', { getters })
