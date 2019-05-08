const functions = require('firebase-functions')

exports.createRequest = functions.firestore
  .document('requests/{requestId}').onCreate((snap, context) => {
    return snap.ref.set({
      ...snap.data(),
      date: new Date().getTime(),
      closed: false
    })
  })
