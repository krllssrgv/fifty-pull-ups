import { createSelector } from '@reduxjs/toolkit';
import { UserState } from './user-types';

export const selectUserAuth = createSelector(
  [(state: RootState) => state.user],
  (user: UserState) => user.authorized
);

export const selectUserData = createSelector(
  [(state: RootState) => state.user],
  (user: UserState) => ({
    name: user.user.name,
    surname: user.user.surname,
    progress: user.user.progress,
    finish: user.user.finish,
    isSuccess: user.user.isSuccess,
  })
);

export const selectUserActs = createSelector(
  [(state: RootState) => state.user],
  (user: UserState) => ({
    types: user.acts.types,
    days: user.acts.days,
    week: user.acts.week,
  })
);

export const selectUserForWeek = createSelector(
  [(state: RootState) => state.user],
  (user: UserState) => ({
    doneDays: [
      user.acts.days[0]?.done,
      user.acts.days[1]?.done,
      user.acts.days[2]?.done,
    ],
    isSuccess: user.user.isSuccess,
    week: user.acts.week,
  })
);

export const selectUserForActs = createSelector(
  [(state: RootState) => state.user],
  (user: UserState) => ({
    acts: user.acts,
  })
);
