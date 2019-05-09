import firebase from 'firebase/app'
import 'firebase/firestore'
import snackbar from '@/helpers/snackbar'

const ref = firebase.firestore().collection('forms')

const fetchById = async (id) => {
  let data = []

  try {
    const result = await ref.doc(id).get()

    data = {
      id,
      ...result.data()
    }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
  return data
}

const fetch = async () => {
  let data = []

  try {
    const result = await ref.get()

    for (let form of result.docs) {
      data.push({
        id: form.id,
        ...form.data()
      })
    }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
  return data
}

const create = async (payload) => {
  let data = null

  try {
    const result = await ref.add({
      ...payload,
      createdBy: firebase.auth().currentUser.uid
    })

    data = {
      id: result.id,
      ...payload
    }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
  return data
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
