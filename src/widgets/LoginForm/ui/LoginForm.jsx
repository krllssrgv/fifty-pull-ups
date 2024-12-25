import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { routes, url, TextInput, ConfirmButton, ErrorField, Loading } from '@shared';
import styles from './LoginForm.module.scss';


function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();


    const login = async () => {
        setEmailError('');
        setPasswordError('');
        setLoading(true);

        const response = await fetch(`${url}api/user/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
        });

        if (response.ok) {
                setLoading(false);
                navigate(routes.main);
        } else {
                setLoading(false);
                if (response.status === 401) {
                    const json = await response.json();
                    if ('email' in json) setEmailError(json.email);
                    if ('password' in json) setPasswordError(json.password);
                    console.log();
                } else {
                    console.log(response.status);
                }
        }
    }


    const renderButton = () => {
        if (loading) {
            return(<Loading size={'min'} />);
        } else {
            return(<ConfirmButton text="Войти" func={login} />)
        }
    }


    return(
        <>
            <div className={styles.headline}>Авторизация</div>
                
            <div className={styles.input}>
                <TextInput
                    type="text" 
                    value={email}
                    setValue={setEmail}
                    placeholder="Email"
                    error={emailError}
                />
    
                <ErrorField text={emailError} />
            </div>
                    
            <div className={styles.input}>
                <TextInput
                    type="password"
                    value={password}
                    setValue={setPassword}
                    placeholder="Пароль"
                    error={passwordError}
                />
    
                <ErrorField text={passwordError} />
            </div>
    
            <Link to={routes.register} className={styles.link}>Зарегистрироваться</Link>
    
            { renderButton() }
        </>
    );
}

export default LoginForm;