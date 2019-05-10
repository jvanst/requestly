import firebase from 'firebase/app'
import 'firebase/firestore'
import snackbar from '@/helpers/snackbar'

const ref = firebase.firestore().collection('forms')

const fetchById = async (id) => {
  try {
    const result = await ref.doc(id).get()
    return { ...result.data(), id }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const fetch = async () => {
  try {
    const data = []
    const result = await ref.get()
    for (let item of result.docs) {
      data.push({
        ...item.data(),
        id: item.id
      })
    }
    return data
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const create = async (payload) => {
  try {
    const result = await ref.add({
      ...payload,
      createdBy: firebase.auth().currentUser.uid
    })
    return { ...payload, id: result.id }
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

const remove = async (id) => {
  try {
    await ref.doc(id).delete()
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

export default {
  fetchById,
  fetch,
  create,
  update,
  delete: remove
}
