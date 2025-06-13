import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './zodLocale';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {ChakraProvider, defaultSystem} from "@chakra-ui/react"
import App from "@/App";
import {persistor, store} from "@/store";
import {ColorModeProvider} from "@/components/ui/color-mode";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider>
            <App/>
          </ColorModeProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
