import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import "/src/Style/Global.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
  </StrictMode>,
)
