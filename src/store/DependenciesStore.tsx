import { UserRepository } from '../repositories/UserRepository';
import { FirestoreService } from '../services/FirestoreService';
import React, { createContext, useContext } from 'react';

const firestoreService = new FirestoreService();
const userRepository = new UserRepository(firestoreService);
const dependencies = {
  firestoreService,
  userRepository,
};

const DependenciesContext = createContext<typeof dependencies>(dependencies);

const DependenciesStoreProvider: React.FC<any> = ({ children }) => {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
};
const useDependencies = () => useContext(DependenciesContext);
export { DependenciesStoreProvider, useDependencies };
