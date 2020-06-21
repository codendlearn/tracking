/* eslint-disable class-methods-use-this */
import * as Constants from '../common/models/Constants'
import { IUser } from '../common/models/IUser'
import { FirestoreService } from '../services/FirestoreService'

export class UserRepository {
  private firebaseService: FirestoreService

  private ServiceCollection = 'users'

  constructor(firebaseService: FirestoreService) {
    this.firebaseService = firebaseService
  }

  AddNewUser(user: IUser) {
    return new Promise<void>((resolve, error) => {
      this.firebaseService.AddUser(user).then((userId) => {
        console.log(userId)
        resolve()
      })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  GetUsers() {
    return new Promise<IUser[]>((resolve, error) => {
      this.firebaseService.GetItems(Constants.UserCollection).then((docs) => {
        const users = docs.map(
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
    return this.firebaseService.SignOut()
  }

  SignInWithGoogle() {
    return new Promise<IUser>((resolve, error) => {
      this.firebaseService.SignInWithGoogle().then((user) => {
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
    this.firebaseService.UpdateCurrentUser(dispatch)
  }
}
