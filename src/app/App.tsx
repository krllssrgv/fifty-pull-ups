import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage, ProfilePage, RegPage, LoginPage } from '@pages';
import { routes, AppProvider } from '@shared';
import './App.css';

export const App = () => {
    return(
        <AppProvider>
            <Suspense fallback={<></>}>
                <BrowserRouter>
                    <Routes>
                        <Route path={routes.main} element={<MainPage />} />
                        <Route path={routes.profile} element={<ProfilePage />} />
                        <Route path={routes.register} element={<RegPage />} />
                        <Route path={routes.login} element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </AppProvider>
    );
}
