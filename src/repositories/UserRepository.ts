import { FirestoreService } from './../services/FirestoreService';
import { users } from '../common/data';
import { IUser } from '../common/models/IUser';
export class UserRepository {
  private firebaseService: FirestoreService;
  private ServiceCollection = 'users';

  constructor(firebaseService: FirestoreService) {
    this.firebaseService = firebaseService;
  }

  GetCurrentUser() {
    return this.firebaseService.GetCurrentUesr();
  }

  GetUsers() {
    return new Promise<IUser[]>((resolve) => resolve(users));
  }

  SignOut() {
    return this.firebaseService.SignOut();
  }

  SignInWithGoogle() {
    return this.firebaseService.SignInWithGoogle();
  }
}
