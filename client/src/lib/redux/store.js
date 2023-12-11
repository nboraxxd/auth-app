import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '@/lib/redux/auth/authSlice'

const rootReducer = combineReducers({ auth: authReducer })

const persitConfig = {
  key: 'auth',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persitConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
