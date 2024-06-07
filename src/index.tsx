// React Imports
import React from 'react'
import ReactDOM from 'react-dom/client'

// Component Imports
import App from './App.tsx'

// Redux Imports
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
