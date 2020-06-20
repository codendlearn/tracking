/* eslint-disable class-methods-use-this */
import { users } from '../common/data'
import { IUser } from '../common/models/IUser'
import { FirestoreService } from '../services/FirestoreService'

export class UserRepository {
  private firebaseService: FirestoreService

  private ServiceCollection = 'users'

  constructor(firebaseService: FirestoreService) {
    this.firebaseService = firebaseService
  }

  GetCurrentUser(): IUser | null {
    const firebaseUser = this.firebaseService.GetCurrentUesr()

    if (firebaseUser != null) {
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName ?? '',
        email: firebaseUser.email ?? '',
        profileImage: firebaseUser.photoURL ?? '',
      }
    }

    return null
  }

  // eslint-disable-next-line class-methods-use-this
  GetUsers() {
    return new Promise<IUser[]>((resolve) => resolve(users))
  }

  SignOut() {
    return this.firebaseService.SignOut()
  }

  SignInWithGoogle() {
    return this.firebaseService.SignInWithGoogle()
  }
}
