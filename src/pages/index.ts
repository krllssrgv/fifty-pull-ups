import { lazy } from "react";

const MainPage = lazy(() => import('./main-page/main-page')),
      ProfilePage = lazy(() => import('./profile-page/profile-page')),
      RegistrationPage = lazy(() => import('./registration-page/registration-page')),
      LoginPage = lazy(() => import('./login-page/login-page'));

export { MainPage, ProfilePage, RegistrationPage, LoginPage };