export type User = {
  name: string;
  surname: string;
  email: string;
  confirmed: string;
  progress: string;
  finish: string;
  isSuccess: string;
  s: string;
};

export type Acts = {
  types: string;
  days: string;
  week: string;
};

export type UserState = {
  authorized: undefined | boolean;
  user: User;
  acts: Acts;
};

export type UserJson = {
  name: string;
  surname: string;
  email: string;
  confirmed: string;
  progress: string;
  finish: string;
  success: string;
  types: string;
  days: string;
  current_week: string;
};
