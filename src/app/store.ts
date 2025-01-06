import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@entities';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
