/* eslint-disable class-methods-use-this */
import * as firebase from 'firebase/app'
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth'
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore'
import { IService } from '../common/models/IService'
import { Action, GlobalStateAction } from '../store/GlobalStore'

export class FirestoreService {
  private Firestore: firebase.firestore.Firestore

  private provider: firebase.auth.GoogleAuthProvider

  firebaseConfig = {
    apiKey: 'AIzaSyCYhnIPdcs1XQk06m_5DLxg2hTTTX4wGL0',
    authDomain: 'learning-fec7e.firebaseapp.com',
    databaseURL: 'https://learning-fec7e.firebaseio.com',
    projectId: 'learning-fec7e',
    storageBucket: 'learning-fec7e.appspot.com',
    messagingSenderId: '970131480634',
    appId: '1:970131480634:web:2382883acc807aa83f1503',
    measurementId: 'G-C15DMTZ9NQ',
  }

  constructor() {
    firebase.initializeApp(this.firebaseConfig)
    this.Firestore = firebase.firestore()
    this.provider = new firebase.auth.GoogleAuthProvider()
    // firebase.auth().setPersistence('local')
  }

  UpdateCurrentUser(dispatch: (value: Action) => void) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: GlobalStateAction.LoggedIn,
          user: {
            id: user.uid,
            name: user.displayName ?? '',
            email: user.email ?? '',
            profileImage: user.photoURL ?? '',
            provider: user.providerId,
          },
        })
      }
    })
  }

  GetCurrentUesr() {
    return firebase.auth().currentUser
  }

  async SignInAnonymously(): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInAnonymously()
  }

  async SignInWithGoogle(): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithPopup(this.provider)
  }

  SignOut() {
    return firebase.auth().signOut()
  }

  async Add(ServiceCollection: string, service: IService) {
    return new Promise((resolve, reject) => {
      this.Firestore.collection(ServiceCollection)
        .add({
          name: service.name,
          displayOrder: service.displayOrder,
          ownerId: service.ownerId,
        })
        .then((data) => {
          if (data) {
            resolve(data.id)
          } else reject(new Error('creation failed'))
        })
        .catch((reason) => reject(reason))
    })
  }

  async GetServices(
    ServiceCollection: string
  ): Promise<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
    // eslint-disable-next-line @typescript-eslint/indent
  > {
    return new Promise((resolve, reject) => {
      this.Firestore.collection(ServiceCollection)
        .get()
        .then((data) => {
          if (data) {
            resolve(data.docs)
          } else reject(new Error('no data'))
        })
        .catch((reason) => reject(reason))
    })
  }

  async GetUsers(ServiceCollection: string) {
    return new Promise((resolve, reject) => {
      this.Firestore.collection(ServiceCollection)
        .get()
        .then((data) => {
          if (data) {
            resolve(data.docs)
          } else reject(new Error('no data'))
        })
        .catch((reason) => reject(reason))
    })
  }
}
