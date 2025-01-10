import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from '@processes';
import { MainPage, RegistrationPage, LoginPage } from '@pages';
import { routes } from '@shared';
import { store } from './store';
import './app.css';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Container />}>
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.registration} element={<RegistrationPage />} />
            <Route path={routes.main} element={<MainPage />} />
          </Route>
          <Route path="*" element={<Navigate to={routes.main} replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
