import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './config/global.jsx'
import App from './App.jsx'
import Auth from './context/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Auth>
        <App />
      </Auth>
    </BrowserRouter>
  </StrictMode>,
)
