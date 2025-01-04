import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@processes';
// import { MainPage, ProfilePage, RegistrationPage, LoginPage } from '@pages';
import { RegistrationPage, LoginPage } from '@pages';
import { routes, AppProvider } from '@shared';
import './app.css';

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Container />}>
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.registration} element={<RegistrationPage />} />
            {/* <Route path={routes.main} element={<MainPage />} />
              <Route path={routes.profile} element={<ProfilePage />} /> */}
          </Route>
          <Route path="*" element={<Navigate to={routes.main} replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};
