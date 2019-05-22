const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()

exports.createProfile = functions.auth.user()
  .onCreate((user) => {
    return Promise.all([
      admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }),
      admin.firestore()
        .collectionGroup('invites')
        .where('email', '==', user.email)
        .get()
        .then(invites =>
          invites.forEach(invite =>
            admin.firestore()
              .collection('projects')
              .doc(invite.data().projectId)
              .collection('permissions')
              .doc(user.uid)
              .set({
                active: true,
                projectId: invite.data().projectId,
                role: invite.data().role,
                uid: user.uid
              })
              .then(() =>
                admin.firestore()
                  .collection('projects')
                  .doc(invite.data().projectId)
                  .collection('invites')
                  .doc(user.email)
                  .delete())))
    ])
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
          .collection('permissions')
          .doc(snap.data().creatorId)
          .set({
            active: true,
            projectId: context.params.projectId,
            role: 'admin',
            uid: snap.data().creatorId
          })
      })
  })

exports.createInvite = functions.firestore
  .document('projects/{projectId}/invites/{inviteId}').onCreate((snap, context) =>
    admin.firestore()
      .collection('users')
      .where('email', '==', snap.id)
      .limit(1)
      .get()
      .then(result => {
        if (result.docs[0]) {
          return admin.firestore()
            .collection('projects')
            .doc(snap.data().projectId)
            .collection('permissions')
            .doc(result.docs[0].id)
            .set({
              active: true,
              projectId: context.params.projectId,
              role: snap.data().role,
              uid: result.docs[0].id
            })
            .then(() =>
              admin.firestore()
                .collection('projects')
                .doc(context.params.projectId)
                .collection('invites')
                .doc(context.params.inviteId)
                .delete())
        } else {
          // TODO: Send Email
        }
      }))

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
