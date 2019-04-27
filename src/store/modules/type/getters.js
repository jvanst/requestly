const byId = state => id => state.data.find(type => type.id === id)

export default {
  byId
}
