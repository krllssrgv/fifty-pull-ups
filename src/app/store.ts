import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});

declare global {
    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;
}