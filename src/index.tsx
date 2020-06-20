import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { DependenciesStoreProvider } from './store/DependenciesStore'
import { GlobalStateProvider } from './store/GlobalStore'

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
