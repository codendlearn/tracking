import React, { useEffect } from 'react';
import { GlobalStateAction, useGlobalState } from '../store/GlobalStore';
import { Button } from '@material-ui/core';
import { useDependencies } from '../store/DependenciesStore';

const Login = () => {
  const { state, dispatch } = useGlobalState();
  const { userRepository } = useDependencies();
  useEffect(() => {});

  const login = () => {
    if (state.user)
      dispatch({
        type: GlobalStateAction.LoggedOut,
      });
    else {
      userRepository
        .SignInWithGoogle()
        .then((user) => {
          console.log(user.additionalUserInfo);
          var userProfile: any = user.additionalUserInfo?.profile;
          userProfile &&
            dispatch({
              type: GlobalStateAction.LoggedIn,
              user: {
                id: userProfile.id,
                name: userProfile.name,
                email: userProfile.email,
                profileImage: userProfile.picture,
              },
            });
        })
        .catch((reason) => console.log(reason));
    }
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={login}>
        {state.user ? 'Logout' : 'Login'}{' '}
      </Button>
    </div>
  );
};

export default Login;
