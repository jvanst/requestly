export default {
  SET (state, value) {
    state.data = value
  },
  ADD (state, payload) {
    const index = state.data.findIndex(p => p.id === payload.id)
    if (index !== -1) {
      state.data.splice(state.data.findIndex(p => p.id === payload.id), 1, payload)
    } else {
      state.data.push(payload)
    }
  },
  REMOVE (state, id) {
    state.data.splice(state.data.findIndex(p => p.id === id), 1)
  },
  SET_LOADING (state, value) {
    state.loading = value
  }
}
