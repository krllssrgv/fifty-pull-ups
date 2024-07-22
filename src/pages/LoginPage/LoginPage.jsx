import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, AuthContainer } from 'features';
import { Loading } from 'widgets';
import { routes, url } from 'shared';


function LoginPage() {
    const navigate = useNavigate(),
          [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Авторизация';

        async function checkLogin() {
            const response = await fetch(`${url}api/user/check_login`, {
                method: 'GET',
                credentials: 'include'
            });
    
            if (response.ok) {
                setLoading(false);
                navigate(routes.main);
            } else {
                setLoading(false);
            }
        }
    
        checkLogin();
    }, []);


    const render = () => {
        if (loading) {
            return(
                <>
                    <Loading size="max" />
                </>
            );
        } else {
            return(
                <AuthContainer>
                    <LoginForm />
                </AuthContainer>
            );
        }
    }


    return(
        <>
            { render() }
        </>
    );
}

export default LoginPage;