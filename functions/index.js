const admin = require('firebase-admin')
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const APP_NAME = 'Requestly'
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password
  }
})

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
          return admin.firestore()
            .collection('users')
            .doc(snap.data().creatorId)
            .get()
            .then(user =>
              admin.firestore()
                .collection('projects')
                .doc(context.params.projectId)
                .get()
                .then(project =>
                  sendInvitationEmail({
                    to: snap.id,
                    from: user.data(),
                    project: project.data()
                  })))
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

async function sendInvitationEmail ({ to, from, project }) {
  const mailOptions = {
    from: `${APP_NAME} <noreply.requestly@gmail.com>`,
    to
  }
  mailOptions.subject = `You have been invited to ${project.title}!`
  mailOptions.text = `Hi! You have been invited to by ${from.displayName} collaborate on the project ${project.title} on ${APP_NAME}. 
  Head over to <a href="https://request-ly.firebaseapp.com/login">https://request-ly.firebaseapp.com/</a> and sign up with this email to join their project!`
  await mailTransport.sendMail(mailOptions)
  return null
}
