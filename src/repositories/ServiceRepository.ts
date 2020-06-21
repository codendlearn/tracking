/* eslint-disable class-methods-use-this */
import { services } from '../common/data'
import { ServiceCollection } from '../common/models/Constants'
import { Interval, IService } from '../common/models/IService'
import { FirestoreService } from '../services/FirestoreService'

export class ServiceRepository {
  firebaseService: FirestoreService

  ServiceCollection = 'tracking'

  constructor(firebaseService: FirestoreService) {
    this.firebaseService = firebaseService
  }

  async Add(newService: IService) {
    return this.firebaseService.Add(this.ServiceCollection, newService)
  }

  async AddSubscriber(userId: string, serviceId: string) {
    return new Promise<void>((resolve) => {
      const service = services.find((x) => x.id === serviceId)
      service?.subscribers?.push({ userId, serviceId, payments: [] })
      resolve()
    })
  }

  async GetServices() {
    return new Promise<IService[]>((resolve, reject) => {
      // setTimeout(() => resolve(services), 10)

      this.firebaseService
        .GetItems(ServiceCollection)
        .then((docs) => {
          const res = docs.map(
            (x): IService => {
              const service = x.data()
              return {
                name: service.name,
                id: x.id,
                displayOrder: service.displayOrder as number,
                ownerId: service.ownerId,
                imageName: '',
                subscription: {
                  serviceId: x.id,
                  paymentInterval: Interval.Monthly,
                  amount: 800,
                  maxParticipants: 5,
                  currentParticipants: 1,
                },
              }
            }
          )

          resolve(res)
        })
        .catch((reason) => reject(reason))
    })
  }
}
