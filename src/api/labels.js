import firebase from 'firebase/app'
import 'firebase/firestore'
import snackbar from '@/helpers/snackbar'

const ref = firebase.firestore().collection('labels')

const fetch = async () => {
  let data = []

  try {
    const result = await ref.get()

    for (let label of result.docs) {
      data.push({
        id: label.id,
        ...label.data()
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
    const result = await ref.add(payload)

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
  fetch,
  create,
  update,
  delete: remove
}
