import { Grid, Toolbar, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { IService } from '../common/models/IService'
import ServiceCard from '../components/ServiceCard'
import { serviceRepository } from '../repositories/ServiceRepository'
import { useGlobalState } from '../store/GlobalStore'

const Home = () => {
  const [services, setServices] = useState<IService[]>()
  const { state } = useGlobalState()

  const getOwnerDetails = (ownerId: string) =>
    state.users.find((user) => user.id === ownerId)

  useEffect(() => {
    serviceRepository.GetServices().then((servicesList: IService[]) => {
      setServices(servicesList)
    })
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
    <>
      <Typography variant="h5">Your's</Typography>
      <Grid container spacing={4} direction="row">
        {services.length === 0 ? (
          <Typography>No services...</Typography>
        ) : (
          services
            .filter((x) => x.ownerId === state.user?.id)
            .map((service) => {
              const user = getOwnerDetails(service.ownerId)
              return (
                user && (
                  <Grid key={service.id} item>
                    <ServiceCard user={user} {...service} />
                  </Grid>
                )
              )
            })
        )}
      </Grid>
      <Toolbar />
      <Typography variant="h5">Their's</Typography>
      <Grid container spacing={4} direction="row">
        {services.length === 0 ? (
          <Typography>No services...</Typography>
        ) : (
          services
            .filter((x) => x.ownerId !== state.user?.id)
            .map((service) => {
              const user = getOwnerDetails(service.ownerId)
              return (
                user && (
                  <Grid key={service.id} item>
                    <ServiceCard user={user} {...service} />
                  </Grid>
                )
              )
            })
        )}
      </Grid>
    </>
  )
}

export default Home
