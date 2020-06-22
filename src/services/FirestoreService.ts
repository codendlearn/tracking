/* eslint-disable class-methods-use-this */
import * as firebase from 'firebase/app'
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth'
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore'
import { ServiceCollection, UserCollection } from '../common/models/Constants'
import { IService } from '../common/models/IService'
import { IUser } from '../common/models/IUser'
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

  constructor(useEmulator: boolean = false) {
    firebase.initializeApp(this.firebaseConfig)
    const db = firebase.firestore()
    if (useEmulator) {
      db.settings({
        host: 'localhost:8080',
        ssl: false,
      })
    }

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
            id: user.providerData[0]?.uid ?? '',
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

  async AddUser(user: IUser) {
    return this.Firestore.collection(UserCollection)
      .doc(user.id)
      .set({
        name: user.name,
        id: user.id,
        email: user.email,
        profileImage: user.profileImage,
        provider: user.provider ?? '',
      })
  }

  async AddService(service: IService) {
    return new Promise((resolve, reject) => {
      this.Firestore.collection(ServiceCollection)
        .doc(service.id)
        .set({ ...service })
        .then(() => {
          resolve()
        })
        .catch((reason) => reject(reason))
    })
  }

  async GetItems(
    ItemServiceCollection: string
  ): Promise<
    // eslint-disable-next-line @typescript-eslint/indent
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  > {
    return new Promise((resolve, reject) => {
      this.Firestore.collection(ItemServiceCollection)
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
