
import firebase from 'firebase/app'
import 'firebase/firestore'

const requestRef = firebase.firestore().collection('requests')

const state = {
  data: {}
}

const actions = {
  async fetch ({ state, commit, rootState }, id) {
    const result = await requestRef.get()

    let data = []
    for (let request of result.docs) {
      data.push({
        id: request.id,
        ...request.data()
      })
    }

    commit('SET_REQUESTS', { id, data })
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
