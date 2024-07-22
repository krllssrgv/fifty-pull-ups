import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm, AuthContainer } from 'features';
import { AppContext } from 'app/AppProvider';
import { routes } from 'shared';


function RegPage() {
    const navigate = useNavigate(),
          { isLogin, setIsLogin } = useContext(AppContext);


    useEffect(() => {
        document.title = 'Регистрация';
    }, []);


    useEffect(() => {
        if (isLogin) navigate(routes.main);
    }, [isLogin]);


    return(
        <AuthContainer>
            <RegisterForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </AuthContainer>
    );
}

export default RegPage;