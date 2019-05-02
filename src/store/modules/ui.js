
const state = {
  dark: JSON.parse(localStorage.getItem('dark'))
}

const mutations = {
  SET_DARK (state, value) {
    state.dark = value
    localStorage.setItem('dark', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
