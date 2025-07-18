import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // sử dụng localStorage
import chatReducer from '@/features/chat/chatSlice'
import authReducer from '@/features/auth/authSlice'
import { socketMiddleware } from '@/middleware/socketMiddleware'

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // chỉ lưu auth
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(socketMiddleware),
})

export const persistor = persistStore(store)
