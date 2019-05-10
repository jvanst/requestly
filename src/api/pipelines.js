import firebase from 'firebase/app'
import 'firebase/firestore'
import snackbar from '@/helpers/snackbar'

const ref = firebase.firestore().collection('pipelines')

const fetch = async () => {
  try {
    const data = []
    const result = await ref.orderBy('order').get()

    for (let pipeline of result.docs) {
      data.push({
        id: pipeline.id,
        ...pipeline.data()
      })
    }
    return data
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const create = async ({ title, order }) => {
  try {
    const result = await ref.add({
      title,
      order,
      createdBy: firebase.auth().currentUser.uid
    })
    return { title, order, id: result.id }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

const update = async (pipelines) => {
  try {
    const batch = firebase.firestore().batch()
    pipelines.forEach((p) => {
      const doc = { ...p }
      delete doc.id
      batch.set(ref.doc(p.id), doc)
    })
    await batch.commit()
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
