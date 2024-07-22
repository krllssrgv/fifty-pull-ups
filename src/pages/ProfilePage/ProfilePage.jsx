import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Header, Loading } from "widgets";
import { url, routes } from "shared";
import { AppContext } from "app/AppProvider";
import { ConfirmButton, TextInput, ErrorField } from "widgets";
import styles from './ProfilePage.module.scss';


function ProfilePage() {
    const [code, setCode] = useState(''),
          [codeError, setCodeError] = useState(''),
          { isLogin, setIsLogin, loading, name, surname, email, confirmed, setConfirmed, progress } = useContext(AppContext),
          navigate = useNavigate();


    useEffect(() => {
        document.title = 'Профиль'; 
    }, []);


    useEffect(() => {
        if (!isLogin) navigate(routes.login);
    }, [isLogin]);


    const logout = () => {
        async function connect() {
            const response = await fetch(`${url}api/user/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok || response.status === 401) {
                setIsLogin(false);
                navigate(routes.login);
            }
        }

        connect();
    }


    const confirm = () => {
        setCodeError('');

        async function connect() {
            const response = await fetch(`${url}api/user/confirm_email`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code: code})
            });

            if (response.status === 204) {
                setConfirmed(true);
            } else if (response.status === 401) {
                navigate(routes.login);
            } else if (response.status === 400) {
                const json = await response.json();
                if ('error' in json) {
                    setCodeError(json.error);
                }
            }
        }

        connect();
    }


    const removeProfile = () => {
        async function connect() {
            const response = await fetch(`${url}api/user/remove`, {
                methed: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                navigate(routes.register);
            }
        }

        connect();
    }


    const renderCheck = () => {
        if (confirmed) {
            return(<></>);
        } else {
            return(
                <div className={classNames(styles.container)}>
                    <div className={styles.data}>Подтвердите Email</div>
                    <div className={styles.code}>
                        <TextInput
                            type="text"
                            value={code}
                            setValue={setCode}
                            placeholder="Код"
                            error={codeError}
                        />

                        <ErrorField text={codeError} />
                    </div>
                    <ConfirmButton text='Подтвердить' func={confirm} />
                </div>
            );
        }
    }


    const render = () => {
        if (loading) {
            return(
                <>
                    <Loading size="max" />
                </>
            );
        } else {
            return(
                <>
                    <Header progress={progress} name={name} />
                    { renderCheck() }
                    <div className={styles.container}>
                        <div className={styles.data}>{name} {surname}</div>
                        <div className={styles.email}>{email}</div>
                        <div className={styles.exit}>
                            <ConfirmButton text='Выйти' func={logout} />
                        </div>
                        <div className={styles.remove} onClick={removeProfile}>Удалить аккаунт</div>
                    </div>
                </>
            );
        }
    }


    return(
        <>
            { render() }
        </>
    )
}

export default ProfilePage;