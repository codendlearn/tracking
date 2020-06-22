import { Button } from '@material-ui/core'
import React from 'react'
import { services, users } from '../common/data'
import { useDependencies } from '../store/DependenciesStore'
import { useGlobalState } from '../store/GlobalStore'

const SeedData = () => {
  const { state } = useGlobalState()
  const { serviceRepository, userRepository } = useDependencies()
  const seedServices = () => {
    services.map((service) => serviceRepository.Add(service))
  }
  const seedUsers = () => {
    users
      .filter((u) => u.id !== state.user?.id)
      .map((user) => userRepository.AddNewUser(user))
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={seedServices}>
        Seed Services
      </Button>

      <Button variant="outlined" color="secondary" onClick={seedUsers}>
        Seed Users
      </Button>
    </>
  )
}

export default SeedData
