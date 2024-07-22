import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm, AuthContainer } from 'features';
import { Loading } from 'widgets';
import { routes, url } from 'shared';


function RegPage() {
    const navigate = useNavigate(),
          [loading, setLoading] = useState(true);


    useEffect(() => {
        document.title = 'Регистрация';

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
                    <RegisterForm />
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

export default RegPage;