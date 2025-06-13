import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {persistor, store} from './store'
import {PersistGate} from 'redux-persist/integration/react'
import {ChakraProvider, defaultSystem} from "@chakra-ui/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider value={defaultSystem}>
          <App/>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
