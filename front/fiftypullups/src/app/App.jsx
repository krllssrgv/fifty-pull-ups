import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from 'shared';
import { MainPage, ProfilePage } from 'pages';
import './App.css';


function App() {
    return(
	    <Suspense fallback={<></>}>
            <BrowserRouter>
                <Routes>
                    <Route path={routes.main} element={<MainPage />} />
                    <Route path={routes.profile} element={<ProfilePage />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
