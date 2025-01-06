import { createSelector } from '@reduxjs/toolkit';
import { UserState } from './user-types';

export const selectUserAuth = createSelector(
  [(state: RootState) => state.user],
  (user: UserState) => user.authorized
);
