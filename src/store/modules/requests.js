
import firebase from 'firebase/app'
import 'firebase/firestore'

const requestRef = (id) =>
  firebase
    .firestore()
    .collection('pipelines')
    .doc(id)
    .collection('requests')

const state = {
  data: {}
}

const actions = {
  async fetch ({ state, commit, rootState }, id) {
    const result = await requestRef(id).get()

    let data = []
    for (let request of result.docs) {
      data.push({
        id: request.id,
        ...request.data()
      })
    }

    commit('SET_REQUESTS', { id, data })
    commit('pipelines/SET_REQUEST_REF', { id, ref: rootState.requests.data[id] }, { root: true })
  }
}

const mutations = {
  SET_REQUESTS (state, { id, data }) {
    state.data[id] = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
