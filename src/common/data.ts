import { Interval, IService } from './models/IService'
import { IUser } from './models/IUser'

export const users: IUser[] = [
  {
    id: '111949323613018175995',
    email: 'codinesh@live.com',
    name: 'Dinesh',
    profileImage:
      'https://lh3.googleusercontent.com/a-/AOh14Gi84uvFH9_l-5eHrUePycvfGy8dVL7yB1flY8bG',
  },
  {
    id: '2',
    email: 'adithya.mullavanam@gmail.com',
    name: 'Adithya',
    profileImage:
      'https://media-exp1.licdn.com/dms/image/C5603AQE2aNWH_JgD8A/profile-displayphoto-shrink_800_800/0?e=1598486400&v=beta&t=bwIeEe7sSc4dK98mKswgYMSJ-yN3_1gpedpKvJQybMI',
  },
  {
    id: '3',
    email: 'ajith.hasthi@gmail.com',
    name: 'Ajith',
    profileImage: '',
  },
  {
    id: '47',
    email: 'naveen.galla@gmail.com',
    name: 'Naveen',
    profileImage: '',
  },
  {
    id: '15',
    email: 'chich@paykar.com',
    name: 'Charan',
    profileImage: '',
  },
]

export const services: IService[] = [
  {
    id: '1',
    name: 'Netflix',
    displayOrder: 1,
    imageName: 'netflixfull.png',
    ownerId: '111949323613018175995',
    subscription: {
      serviceId: '1',
      amount: 900,
      paymentInterval: Interval.Monthly,
      maxParticipants: 5,
      currentParticipants: 1,
    },
    subscribers: [
      {
        userId: '2',
        serviceId: '1',
        payments: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Prime Video',
    displayOrder: 2,
    imageName: 'amazonprime.png',
    ownerId: '15',
    subscription: {
      serviceId: '1',
      amount: 1000,
      paymentInterval: Interval.Yearly,
      maxParticipants: 5,
      currentParticipants: 1,
    },
  },
  {
    id: '3',
    name: 'YouTube',
    displayOrder: 3,
    imageName: 'youtube.png',
    ownerId: '111949323613018175995',
    subscription: {
      serviceId: '3',
      amount: 250,
      paymentInterval: Interval.Monthly,
      maxParticipants: 5,
      currentParticipants: 1,
    },
  },
  {
    id: '4',
    name: 'Hotstar',
    displayOrder: 4,
    imageName: 'background.jpg',
    ownerId: '15',
    subscription: {
      serviceId: '4',
      amount: 1000,
      paymentInterval: Interval.Yearly,
      maxParticipants: 5,
      currentParticipants: 1,
    },
  },
]
