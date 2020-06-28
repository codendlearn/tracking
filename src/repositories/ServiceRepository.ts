/* eslint-disable class-methods-use-this */
import { firestore } from 'firebase'
import { ServiceCollection } from '../common/models/Constants'
import { IService, ISubscriber, ISubscription } from '../common/models/IService'

class ServiceRepository {
  async Add(newService: IService) {
    return new Promise<void>((resolve, error) => {
      firestore()
        .collection(ServiceCollection)
        .doc(newService.id)
        .set({ ...newService })
        .then(() => {
          resolve()
        })
        .catch((reason) => error(reason))
    })
  }

  async AddSubscriber(userId: string, serviceId: string, isApproved: boolean) {
    return new Promise<IService>((resolve) => {
      firestore()
        .collection(ServiceCollection)
        .doc(serviceId)
        .get()
        .then((data) => {
          const service = data.data()
          if (service) {
            let latestSubscribers: ISubscriber[] = service.subscribers ?? []
            latestSubscribers = [
              ...latestSubscribers,
              {
                serviceId,
                userId,
                payments: [],
                isApproved,
                subscribedOn: new Date(),
              },
            ]
            data.ref.update({ subscribers: latestSubscribers })
          }
        })
    })
  }

  async ApproveSubscriber(userId: string, serviceId: string) {
    return new Promise<IService>((resolve) => {
      firestore()
        .collection(ServiceCollection)
        .doc(serviceId)
        .get()
        .then((data) => {
          const service = data.data()
          if (service) {
            const latestSubscribers: ISubscriber[] = service.subscribers ?? []
            const subscriberToUpdate = latestSubscribers.find(
              (s) => s.userId === userId
            )
            if (subscriberToUpdate) subscriberToUpdate.isApproved = true
            data.ref.update({ subscribers: latestSubscribers })
          }
        })
    })
  }

  async GetService(serviceId: string) {
    return new Promise<IService>((resolve, reject) => {
      firestore()
        .collection(ServiceCollection)
        .doc(serviceId)
        .get()
        .then((data) => {
          const serviceFrom = data.data()
          serviceFrom &&
            resolve({
              name: serviceFrom.name,
              displayOrder: serviceFrom.displayOrder,
              ownerId: serviceFrom.ownerId,
              subscription: serviceFrom.subscription as ISubscription,
              subscribers: (serviceFrom.subscribers as ISubscriber[]) ?? [],
              imageName: serviceFrom.imageName,
            })
        })
    })
  }

  async GetServices() {
    return new Promise<IService[]>((resolve, reject) => {
      // setTimeout(() => resolve(services), 10)

      firestore()
        .collection(ServiceCollection)
        .get()
        .then((result) => {
          const res = result.docs.map(
            (x): IService => {
              const service = x.data()
              return {
                name: service.name,
                id: x.id,
                displayOrder: service.displayOrder as number,
                ownerId: service.ownerId,
                imageName: service.imageName,
                subscription: { ...service.subscription },
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

export const serviceRepository = new ServiceRepository()
