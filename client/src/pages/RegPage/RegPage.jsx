import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RegisterForm, AuthContainer } from 'features';
import { url, routes } from 'shared';


function RegPage() {
    let location = useLocation();


    useEffect(() => {
        document.title = 'Регистрация';

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
            <RegisterForm />
        </AuthContainer>
    );
}

export default RegPage;