import React, { createContext, useReducer, useContext } from 'react'
import { IUser } from '../common/models/IUser'
import { IGlobalState } from '../common/models/IGlobalState'

export enum GlobalStateAction {
  Busy,
  Idle,
  Error,
  LoggedIn,
  LoggedOut,
}

type Action =
  | { type: GlobalStateAction.Busy }
  | { type: GlobalStateAction.Idle }
  | { type: GlobalStateAction.Error; error: string }
  | { type: GlobalStateAction.LoggedIn; user: IUser }
  | { type: GlobalStateAction.LoggedOut }

const initialUserState: IGlobalState = {
  hasError: false,
  busy: false,
}

const globalStore = createContext<{
  state: IGlobalState
  dispatch: React.Dispatch<Action>
}>({
  state: initialUserState,
  dispatch: () => {},
})

const reducer: React.Reducer<IGlobalState, Action> = (state, action) => {
  switch (action.type) {
    case GlobalStateAction.Busy:
      return { ...state, busy: true }
    case GlobalStateAction.Idle:
      return { ...state, busy: false }
    case GlobalStateAction.Error:
      return { ...state, busy: false, error: action.error }
    case GlobalStateAction.LoggedIn:
      return { ...state, user: { ...action.user } }
    case GlobalStateAction.LoggedOut:
      return { ...state, user: undefined }
    default:
      return state
  }
}

const GlobalStateProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<IGlobalState, Action>>(
    reducer,
    initialUserState
  )

  return (
    <globalStore.Provider value={{ state: state, dispatch }}>
      {children}
    </globalStore.Provider>
  )
}

const useGlobalState = () => useContext(globalStore)

export { GlobalStateProvider, useGlobalState }
