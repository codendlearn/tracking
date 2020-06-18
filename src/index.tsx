import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStateProvider } from './store/GlobalStore'
import { DependenciesStoreProvider } from './store/DependenciesStore'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DependenciesStoreProvider>
        <GlobalStateProvider>
          <App />
        </GlobalStateProvider>
      </DependenciesStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
