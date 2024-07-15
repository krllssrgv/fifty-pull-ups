import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginForm, AuthContainer } from 'features';
import { url, routes } from 'shared';


function LoginPage() {
    let location = useLocation();


    useEffect(() => {
        document.title = 'Авторизация';

        async function checkLogin() {
            const response = await fetch(`${url}api/user/check_login`,{
                method: 'GET'
            });

            if (response.ok) {
                location(routes.main);
            }
        }

        checkLogin();
    }, []);


    return(
        <AuthContainer>
            <LoginForm />
        </AuthContainer>
    );
}

export default LoginPage;