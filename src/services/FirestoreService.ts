import app from 'firebase/app';
import 'firebase';
import 'firebase/firestore';
import { IService } from '../common/models/IService';

export class FirestoreService {
  private App: app.app.App;
  private Firestore: app.firestore.Firestore;
  private provider: app.auth.GoogleAuthProvider;

  firebaseConfig: any = {
    apiKey: 'AIzaSyCYhnIPdcs1XQk06m_5DLxg2hTTTX4wGL0',
    authDomain: 'learning-fec7e.firebaseapp.com',
    databaseURL: 'https://learning-fec7e.firebaseio.com',
    projectId: 'learning-fec7e',
    storageBucket: 'learning-fec7e.appspot.com',
    messagingSenderId: '970131480634',
    appId: '1:970131480634:web:2382883acc807aa83f1503',
    measurementId: 'G-C15DMTZ9NQ',
  };

  constructor() {
    this.App = app.initializeApp(this.firebaseConfig);
    this.Firestore = this.App.firestore();
    this.provider = new app.auth.GoogleAuthProvider();
  }

  GetCurrentUesr() {
    return this.App.auth().currentUser;
  }
  async SignInAnonymously(): Promise<app.auth.UserCredential> {
    return this.App.auth().signInAnonymously();
  }

  async SignInWithGoogle(): Promise<app.auth.UserCredential> {
    return this.App.auth().signInWithPopup(this.provider);
  }

  SignOut() {
    return this.App.auth().signOut();
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
            resolve(data.id);
          } else reject('creation failed');
        })
        .catch((reason) => reject(reason));
    });
  }

  async GetServices(
    ServiceCollection: string
  ): Promise<
    app.firestore.QueryDocumentSnapshot<app.firestore.DocumentData>[]
  > {
    return new Promise((resolve, reject) => {
      this.Firestore.collection(ServiceCollection)
        .get()
        .then((data) => {
          if (data) {
            resolve(data.docs);
          } else reject('no data');
        })
        .catch((reason) => reject(reason));
    });
  }

  async GetUsers(ServiceCollection: string) {
    return new Promise((resolve, reject) => {
      this.Firestore.collection(ServiceCollection)
        .get()
        .then((data) => {
          if (data) {
            resolve(data.docs);
          } else reject('no data');
        })
        .catch((reason) => reject(reason));
    });
  }
}
