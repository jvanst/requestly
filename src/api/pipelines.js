import firebase from 'firebase/app'
import 'firebase/firestore'
import snackbar from '@/helpers/snackbar'

const ref = firebase.firestore().collection('pipelines')

const fetch = async () => {
  let data = []

  try {
    const result = await ref.orderBy('order').get()

    for (let pipeline of result.docs) {
      data.push({
        id: pipeline.id,
        ...pipeline.data()
      })
    }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
  return data
}

const create = async ({ title, order }) => {
  let data = null

  try {
    const result = await ref.add({ title, order })

    data = {
      id: result.id,
      title,
      order
    }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
  return data
}

const update = async (pipelines) => {
  const batch = firebase.firestore().batch()

  pipelines.forEach((p) => {
    const doc = { ...p }
    delete doc.id
    batch.set(ref.doc(p.id), doc)
  })

  try {
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
