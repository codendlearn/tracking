import * as firebase from 'firebase/app'
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth'
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCYhnIPdcs1XQk06m_5DLxg2hTTTX4wGL0',
  authDomain: 'learning-fec7e.firebaseapp.com',
  databaseURL: 'https://learning-fec7e.firebaseio.com',
  projectId: 'learning-fec7e',
  storageBucket: 'learning-fec7e.appspot.com',
  messagingSenderId: '970131480634',
  appId: '1:970131480634:web:2382883acc807aa83f1503',
  measurementId: 'G-C15DMTZ9NQ',
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
if (process.env.NODE_ENV === 'development') {
  db.settings({
    host: 'localhost:8080',
    ssl: false,
  })
}

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
