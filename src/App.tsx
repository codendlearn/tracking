import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import React from 'react'
import './App.css'
import Navigation from './components/Navigation'
import theme from './theme'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
    </MuiThemeProvider>
  )
}

export default App
