/* eslint-disable class-methods-use-this */
import { services } from '../common/data'
import { ServiceCollection } from '../common/models/Constants'
import { Interval, IService } from '../common/models/IService'
import { FirestoreService } from '../services/FirestoreService'

export class ServiceRepository {
  firebaseService: FirestoreService

  constructor(firebaseService: FirestoreService) {
    this.firebaseService = firebaseService
  }

  async Add(newService: IService) {
    return this.firebaseService.AddService(newService)
  }

  async AddSubscriber(userId: string, serviceId: string) {
    return new Promise<void>((resolve) => {
      const service = services.find((x) => x.id === serviceId)

      service && (service.subscribers = service.subscribers ?? [])
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
              console.log(service)
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
                subscribers: service.subscribers && [...service.subscribers],
              }
            }
          )

          resolve(res.sort((x, y) => x.displayOrder - y.displayOrder))
        })
        .catch((reason) => reject(reason))
    })
  }
}
