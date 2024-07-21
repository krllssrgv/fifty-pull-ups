import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm, AuthContainer } from 'features';
import { url, routes } from 'shared';


function RegPage() {
    let navigate = useNavigate();


    useEffect(() => {
        document.title = 'Регистрация';

        async function checkLogin() {
            const response = await fetch(`${url}api/user/check_login`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                navigate(routes.main);
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