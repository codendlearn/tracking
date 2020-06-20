import React, { useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from './theme'
import { useGlobalState } from './store/GlobalStore'
import { useDependencies } from './store/DependenciesStore'

function App() {
  const { state, dispatch } = useGlobalState()
  const { userRepository } = useDependencies()

  useEffect(() => {
    if (!state.user) userRepository.UpdateCurrentUser(dispatch)
  })

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
    </MuiThemeProvider>
  )
}

export default App
