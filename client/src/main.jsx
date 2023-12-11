import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { QueryProvider } from '@/lib/tanstack-query/QueryProvider'
import { persistor, store } from '@/lib/redux/store'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryProvider>
  </React.StrictMode>
)
