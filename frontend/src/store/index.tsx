import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { apiSlice } from '../services/apiSlice'

export const store: EnhancedStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})
