import { CssBaseline, MuiThemeProvider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import { useDependencies } from './store/DependenciesStore'
import { useGlobalState } from './store/GlobalStore'
import theme from './theme'

function App() {
  const { state, dispatch } = useGlobalState()
  const { userRepository } = useDependencies()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!state.user) {
      setReady(false)
      userRepository.UpdateCurrentUser(dispatch)
    }

    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user])

  if (ready) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
      </MuiThemeProvider>
    )
  }

  return <Typography>Hello</Typography>
}

export default App
