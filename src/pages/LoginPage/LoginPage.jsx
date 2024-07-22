import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, AuthContainer } from 'features';
import { AppContext } from 'app/AppProvider';
import { routes } from 'shared';


function LoginPage() {
    const navigate = useNavigate(),
          { isLogin, setIsLogin } = useContext(AppContext);


    useEffect(() => {
        document.title = 'Авторизация';
    }, []);


    useEffect(() => {
        if (isLogin) navigate(routes.main);
    }, [isLogin]);


    return(
        <AuthContainer>
            <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </AuthContainer>
    );
}

export default LoginPage;