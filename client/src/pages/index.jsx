import { lazy } from "react";

const MainPage = lazy(() => import('./MainPage/MainPage')),
      ProfilePage = lazy(() => import('./ProfilePage/ProfilePage'));

export { MainPage, ProfilePage };