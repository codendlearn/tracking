import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import React, { useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import { useDependencies } from './store/DependenciesStore'
import { useGlobalState } from './store/GlobalStore'
import theme from './theme'

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
