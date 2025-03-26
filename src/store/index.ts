import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import tasksReducer from './slices/tasksSlice';
import authReducer from './slices/authSlice';
import weatherReducer from './slices/weatherSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['weather/fetchWeather/rejected'],
      },
    }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;