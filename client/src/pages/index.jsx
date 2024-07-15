import { lazy } from "react";

const MainPage = lazy(() => import('./MainPage/MainPage')),
      ProfilePage = lazy(() => import('./ProfilePage/ProfilePage')),
      RegPage = lazy(() => import('./RegPage/RegPage')),
      LoginPage = lazy(() => import('./LoginPage/LoginPage'));

export { MainPage, ProfilePage, RegPage, LoginPage };