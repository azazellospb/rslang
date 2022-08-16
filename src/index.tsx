import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { setupStore } from './components/redux/store'

const docRoot = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(docRoot)
const store = setupStore()
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>

  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
