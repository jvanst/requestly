export default {
  getById: state => id => state.data.find(r => r.id === id)
}
