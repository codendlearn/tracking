import { Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { IService } from '../common/models/IService'
import { IUser } from '../common/models/IUser'
import ServiceCard from '../components/ServiceCard'
import { serviceRepository } from '../repositories/ServiceRepository'
import { userRepository } from '../repositories/UserRepository'

const Home = () => {
  const [services, setServices] = useState<IService[]>()
  const [users, setUsers] = useState<IUser[]>()

  const getOwnerDetails = (ownerId: string) =>
    users && users.find((user) => user.id === ownerId)

  useEffect(() => {
    serviceRepository.GetServices().then((servicesList: IService[]) => {
      setServices(servicesList)
    })

    userRepository.GetUsers().then((usersList: IUser[]) => setUsers(usersList))
  })

  return services === undefined ? (
    <Grid container direction="row" spacing={4}>
      {[0, 1, 2, 3, 4, 5].map((service) => (
        <Grid key={service} item>
          <Skeleton variant="rect" width={245} height={118} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid container spacing={4} direction="row">
      {services.length === 0 ? (
        <Typography>No services...</Typography>
      ) : (
        services.map((service) => {
          const user = getOwnerDetails(service.ownerId)
          return (
            <Grid key={service.id} item>
              <ServiceCard user={user} {...service} />
            </Grid>
          )
        })
      )}
    </Grid>
  )
}

export default Home
