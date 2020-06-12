import { FirestoreService } from './../services/FirestoreService';
import { IService } from '../common/models/Service';

export class ServiceRepository {
  firebaseService: FirestoreService;
  ServiceCollection = 'tracking';
  constructor(firebaseService: FirestoreService) {
    this.firebaseService = firebaseService;
  }

  async Add(newService: IService) {
    return this.firebaseService.Add(this.ServiceCollection, newService);
  }

  async GetServices() {
    return new Promise<IService[]>((resolve, reject) => {
      this.firebaseService
        .GetServices('tracking')
        .then((docs) => {
          var res = docs.map(
            (x): IService => {
              let service = x.data();
              return {
                name: service['name'],
                id: x.id,
                order: service['order'],
                ownerId: service['ownerId'],
              };
            }
          );

          resolve(res);
        })
        .catch((reason) => reject(reason));
    });
  }
}
