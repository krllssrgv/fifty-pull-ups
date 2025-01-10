export type User = {
  name: string;
  surname: string;
  email: string;
  progress: string;
  finish: string;
  isSuccess: string;
  s: string;
};

export type Day = {
  number: number;
  done: boolean;
  acts: number[];
};

type Types = 'reverse' | 'wide' | 'narrow' | 'straight';

export type Acts = {
  types: Types[];
  days: Day[];
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
  types: Types[];
  days: Day[];
  current_week: string;
};
