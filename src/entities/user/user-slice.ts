import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from './fetch-user';
import { UserState, UserJson } from './user-types';

const initialState: UserState = {
  authorized: undefined,
  user: {
    name: '',
    surname: '',
    email: '',
    progress: '',
    finish: '',
    isSuccess: '',
    s: '',
  },
  acts: {
    types: '',
    days: '',
    week: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state: UserState) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUser.fulfilled,
        (state: UserState, action: PayloadAction<UserJson>) => {
          state.authorized = true;
          state.user.name = action.payload.name;
          state.user.surname = action.payload.surname;
          state.user.email = action.payload.email;
          state.user.progress = action.payload.progress;
          state.user.finish = action.payload.finish;
          state.user.isSuccess = String(action.payload.success);
          state.acts.types = action.payload.finish ? '' : action.payload.types;
          state.acts.days = action.payload.finish ? '' : action.payload.days;
          state.acts.week = action.payload.finish
            ? ''
            : action.payload.current_week;
        }
      )
      .addCase(fetchUser.rejected, (state: UserState) => {
        Object.assign(state, initialState);
        state.authorized = false;
      })
      .addDefaultCase(() => {});
  },
});

export const { resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
