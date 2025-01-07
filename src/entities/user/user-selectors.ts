import { createSelector } from '@reduxjs/toolkit';
import { UserState, User, Acts } from './user-types';

export const selectUserAuth = createSelector(
  [(state: RootState) => state.user],
  (user: UserState) => user.authorized
);

export const selectUserData = createSelector(
  [(state: RootState) => state.user.user],
  (user: User) => ({
    name: user.name,
    surname: user.surname,
    progress: user.progress,
    finish: user.finish,
  })
);

export const selectUserActs = createSelector(
  [(state: RootState) => state.user.acts],
  (acts: Acts) => ({
    types: acts.types,
    days: acts.days,
    week: acts.week,
  })
);
