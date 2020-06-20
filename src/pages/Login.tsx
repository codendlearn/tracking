import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDependencies } from '../store/DependenciesStore'
import { GlobalStateAction, useGlobalState } from '../store/GlobalStore'

const Login = () => {
  const history = useHistory()
  const { state, dispatch } = useGlobalState()
  const { userRepository } = useDependencies()
  useEffect(() => {})

  const login = () => {
    if (!state.user)
      userRepository
        .SignInWithGoogle()
        .then((user) => {
          const userProfile = user.additionalUserInfo?.profile as {
            id: string
            name: string
            email: string
            picture: string
          }
          userProfile &&
            dispatch({
              type: GlobalStateAction.LoggedIn,
              user: {
                id: userProfile.id,
                name: userProfile.name,
                email: userProfile.email,
                profileImage: userProfile.picture,
              },
            })

          history.push('/')
        })
        .catch((reason) => console.log(reason))
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
