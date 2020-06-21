import React, { createContext, useContext } from 'react'
import { ServiceRepository } from '../repositories/ServiceRepository'
import { UserRepository } from '../repositories/UserRepository'
import { FirestoreService } from '../services/FirestoreService'

const firestoreService = new FirestoreService(true)
const userRepository = new UserRepository(firestoreService)
const serviceRepository = new ServiceRepository(firestoreService)
const dependencies = {
  userRepository,
  serviceRepository,
}

const DependenciesContext = createContext<typeof dependencies>(dependencies)

const DependenciesStoreProvider: React.FC = ({ children }) => {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  )
}
const useDependencies = () => useContext(DependenciesContext)
export { DependenciesStoreProvider, useDependencies }
