import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import "/src/Style/Global.css"
import { Toaster } from 'react-hot-toast'
import store, { persistor } from './Redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
  <StrictMode>
    <BrowserRouter>
    <AppRouter />
    <Toaster/>
    </BrowserRouter>
  </StrictMode>
      </PersistGate>
    </Provider>,
)
