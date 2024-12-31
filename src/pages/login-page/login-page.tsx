import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@widgets';
import { routes, url, Loading, AuthContainer } from '@shared';


function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Авторизация';
    }, []);

    useEffect(() => {
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


    if (loading) {
        return(<Loading size="max" />);
    } else {
        return(
            <AuthContainer>
                <LoginForm />
            </AuthContainer>
        );
    }
}

export default LoginPage;