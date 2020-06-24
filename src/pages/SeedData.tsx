import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { services, users } from '../common/data'
import { serviceRepository } from '../repositories/ServiceRepository'
import { userRepository } from '../repositories/UserRepository'
import { useGlobalState } from '../store/GlobalStore'

const SeedData = () => {
  const { state } = useGlobalState()
  const seedServices = () => {
    services.map((service) => serviceRepository.Add(service))
  }
  const seedUsers = () => {
    users
      .filter((u) => u.id !== state.user?.id)
      .map((user) => userRepository.AddNewUser(user))
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>
          Dev only - to insert seed data for testing purposes.
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={seedServices}>
          Seed Services
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary" onClick={seedUsers}>
          Seed Users
        </Button>
      </Grid>
    </Grid>
  )
}

export default SeedData
