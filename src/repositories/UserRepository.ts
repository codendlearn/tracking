import { FirestoreService } from './../services/FirestoreService';
export class UserRepository {
  private firebaseService: FirestoreService;
  private ServiceCollection = 'users';

  constructor(firebaseService: FirestoreService) {
    this.firebaseService = firebaseService;
  }

  GetCurrentUser() {
    return this.firebaseService.GetCurrentUesr();
  }

  SignOut() {
    return this.firebaseService.SignOut();
  }

  SignInWithGoogle() {
    return this.firebaseService.SignInWithGoogle();
  }
}
