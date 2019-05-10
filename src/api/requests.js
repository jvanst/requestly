import firebase from 'firebase/app'
import 'firebase/firestore'
import snackbar from '@/helpers/snackbar'

const ref = firebase.firestore().collection('requests')

const fetchById = async (id) => {
  try {
    const result = await ref.doc(id).get()
    return { ...result.data(), id: result.id }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const fetch = async () => {
  try {
    const data = []
    const result = await ref.where('closed', '==', false).get()
    for (let request of result.docs) {
      data.push({
        id: request.id,
        ...request.data()
      })
    }
    return data
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const create = async (payload) => {
  try {
    // Get the default pipeline
    const firstPipeline =
      await firebase
        .firestore()
        .collection('pipelines')
        .orderBy('order')
        .limit(1)
        .get()

    payload.pipelineId = firstPipeline.docs[0].id
    payload.createdBy = firebase.auth().currentUser.uid // Set userId
    payload.title = payload.content.title // Move content title
    delete payload.content.title

    const result = await ref.add(payload)
    return { id: result.id, ...payload }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const update = async ({ id, payload }) => {
  try {
    await ref.doc(id).set(payload)
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

export default {
  fetchById,
  fetch,
  create,
  update
}
