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
  acts: any;
};

export type Acts = {
  types: string[];
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
  types: string[];
  days: Day[];
  current_week: string;
};
