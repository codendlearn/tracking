import { FirestoreService } from '../services/FirestoreService'
import { users } from '../common/data'
import { IUser } from '../common/models/IUser'

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
