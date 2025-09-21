import { configureStore } from '@reduxjs/toolkit';
import auth from './middleware/auth';
import afterAuth from './middleware/afterAuth';
import reducers from './reducers/index';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(auth, afterAuth),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootStateFn = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
