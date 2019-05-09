const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()

exports.createProfile = functions.auth.user()
  .onCreate((user) => {
    return admin.firestore().doc('users/' + user.uid).set({
      email: user.email,
      displayName: user.displayName,
      role: 'author',
      photoURL: user.photoURL
    })
  })

exports.createLabel = functions.firestore
  .document('labels/{labelId}').onCreate((snap, context) => {
    return snap.ref.set({
      ...snap.data(),
      date: admin.firestore.FieldValue.serverTimestamp()
    })
  })

exports.createRequest = functions.firestore
  .document('requests/{requestId}').onCreate((snap, context) => {
    return snap.ref.set({
      ...snap.data(),
      date: admin.firestore.FieldValue.serverTimestamp(),
      closed: false
    })
  })

exports.createForm = functions.firestore
  .document('forms/{formsId}').onCreate((snap, context) => {
    return snap.ref.set({
      ...snap.data(),
      date: admin.firestore.FieldValue.serverTimestamp()
    })
  })
