import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { useGlobalState } from '../../store/GlobalStore'

export interface ProtectedRouteProps extends RouteProps {}

export const PrivateRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { state } = useGlobalState()

  return !state.user ? (
    <Redirect to={{ pathname: '/Login' }} />
  ) : (
    <Route {...props} />
  )
}

export default PrivateRoute
