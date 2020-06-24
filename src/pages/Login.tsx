import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { IUser } from '../common/models/IUser'
import { userRepository } from '../repositories/UserRepository'
import { GlobalStateAction, useGlobalState } from '../store/GlobalStore'

const Login = () => {
  const history = useHistory()
  const { state, dispatch } = useGlobalState()
  useEffect(() => {
    state.user && history.push('/')
  })

  const login = () => {
    if (!state.user)
      userRepository
        .SignInWithGoogle()
        .then((user: IUser) => {
          user &&
            dispatch({
              type: GlobalStateAction.LoggedIn,
              user,
            })

          userRepository.AddNewUser(user)

          history.push('/')
        })
        .catch((reason: unknown) => console.log(reason))
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={login}>
        {state.user ? `Welcome ${state.user.name}` : 'Login'}
      </Button>
    </div>
  )
}

export default Login
