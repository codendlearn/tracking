import firebase, { auth, firestore } from 'firebase'
import { UserCollection } from '../common/models/Constants'
/* eslint-disable class-methods-use-this */
import { IUser } from '../common/models/IUser'
import { googleAuthProvider } from '../services/firebase'
import { GlobalStateAction } from '../store/GlobalStore'

class UserRepository {
  AddNewUser(user: IUser) {
    return new Promise<void>((resolve, error) => {
      firestore()
        .collection(UserCollection)
        .doc(user.id)
        .set({
          name: user.name,
          id: user.id,
          email: user.email,
          profileImage: user.profileImage,
          provider: user.provider ?? '',
        })
        .then((userId) => {
          resolve()
        })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  GetUsers() {
    return new Promise<IUser[]>((resolve, error) => {
      firestore()
        .collection(UserCollection)
        .get()
        .then((result) => {
          const users = result.docs.map(
            (doc): IUser => {
              const user = doc.data()
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                profileImage: user.profileImage,
                provider: user.provider,
              }
            }
          )

          resolve(users)
        })
    })
  }

  SignOut() {
    return auth().signOut()
  }

  SignInWithGoogle() {
    return new Promise<IUser>((resolve, error) => {
      auth()
        .signInWithPopup(googleAuthProvider)
        .then((user) => {
          const userProfile = user.additionalUserInfo?.profile as {
            id: string
            name: string
            email: string
            picture: string
          }

          resolve({
            id: userProfile.id,
            name: userProfile.name,
            email: userProfile.email,
            profileImage: userProfile.picture,
          })
        })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UpdateCurrentUser(dispatch: (value: any) => void) {
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
}

export const userRepository = new UserRepository()
