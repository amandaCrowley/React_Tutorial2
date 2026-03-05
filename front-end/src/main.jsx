
//Entry point to the application

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* This is loading the App.jsx component page*/}
  </StrictMode>,
)
