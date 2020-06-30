import * as functions from 'firebase-functions'
import admin = require('firebase-admin')
admin.initializeApp()

exports.addNewUser = functions.auth.user().onCreate((user) => {
  const {
    uid,
    email,
    displayName,
    disabled,
    photoURL,
    phoneNumber,
    emailVerified,
  } = user
  const addResult = admin.firestore().collection('users').doc(uid).create({
    email,
    displayName,
    disabled,
    photoURL,
    phoneNumber,
    emailVerified,
  })
  console.log(`User created ${uid}, ${email}`)
  return addResult
})
