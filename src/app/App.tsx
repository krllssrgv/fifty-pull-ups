import { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContainer } from '@processes';
import { MainPage, ProfilePage, RegistrationPage, LoginPage } from '@pages';
import { routes, AppProvider } from '@shared';
import './app.css';

export const App = () => {
  return (
    <AppProvider>
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <Routes>
            <Route path="auth" element={<AuthContainer />}>
              <Route index element={<LoginPage />} />
              <Route
                path={routes.registration}
                element={<RegistrationPage />}
              />
            </Route>
            <Route path={routes.main} element={<MainPage />} />
            <Route path={routes.profile} element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="auth" />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AppProvider>
  );
};
