import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage, ProfilePage, RegistrationPage, LoginPage } from '@pages';
import { routes, AppProvider } from '@shared';
import './app.css';

export const App = () => {
    return(
        <AppProvider>
            <Suspense fallback={<></>}>
                <BrowserRouter>
                    <Routes>
                        <Route path={routes.main} element={<MainPage />} />
                        <Route path={routes.profile} element={<ProfilePage />} />
                        <Route path={routes.register} element={<RegistrationPage />} />
                        <Route path={routes.login} element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </AppProvider>
    );
}
