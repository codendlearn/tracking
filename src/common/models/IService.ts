export interface IService {
  name: string
  id?: string
  displayOrder: number
  ownerId: string
  imageName: string
  subscription: ISubscription
  subscribers?: ISubscriber[]
}

export interface ISubscription {
  serviceId: string
  paymentInterval: Interval
  amount: number
  maxParticipants: number
  currentParticipants: number
}

export interface ISubscriber {
  serviceId: string
  userId: string
  payments: IPayment[]
}

export interface IPayment {
  userId: string
  serviceId: string
  amount: number
  date: Date
}

export enum Interval {
  Monthly,
  Quarterly,
  Yearly,
}
