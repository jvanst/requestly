const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()

exports.createProfile = functions.auth.user()
  .onCreate((user) => {
    return admin.firestore().doc('users/' + user.uid).set({
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    })
  })

exports.createProject = functions.firestore
  .document('projects/{projectId}').onCreate((snap, context) => {
    const permissions = {}
    permissions[snap.data().creatorId] = {
      active: true,
      role: 'admin'
    }
    return snap.ref.set({
      ...snap.data(),
      createdOn: admin.firestore.FieldValue.serverTimestamp()
    })
      .then(() => {
        admin.firestore()
          .collection('projects')
          .doc(context.params.projectId)
          .set({
            ...snap.data(),
            permissions
          })
      })
  })

exports.createLabel = functions.firestore
  .document('projects/{projectId}/labels/{labelId}').onCreate((snap, context) => {
    return snap.ref.set({
      ...snap.data(),
      createdOn: admin.firestore.FieldValue.serverTimestamp()
    })
  })

exports.createRequest = functions.firestore
  .document('projects/{projectId}/requests/{requestId}').onCreate((snap, context) => {
    return snap.ref.set({
      ...snap.data(),
      createdOn: admin.firestore.FieldValue.serverTimestamp()
    })
  })

exports.createForm = functions.firestore
  .document('projects/{projectId}/forms/{formsId}').onCreate((snap, context) => {
    return snap.ref.set({
      ...snap.data(),
      createdOn: admin.firestore.FieldValue.serverTimestamp()
    })
  })
