import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { QueryProvider } from '@/lib/tanstack-query/QueryProvider'
import { store } from '@/lib/redux/store'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryProvider>
  </React.StrictMode>
)
