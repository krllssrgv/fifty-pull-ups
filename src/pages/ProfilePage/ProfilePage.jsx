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
          { isDataLoaded, setIsDataLoaded,
            name, setName,
            surname, setSurname,
            email, setEmail,
            confirmed, setConfirmed,
            progress, setProgress,
            setFinish, setIsSuccess, setTypes, setDays, setWeek } = useContext(AppContext),
          navigate = useNavigate();


    useEffect(() => {
        document.title = 'Профиль';

        async function getUserData() {
            const response = await fetch(`${url}api/user/user`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.status === 200) {
                const json = await response.json();
                setName(json.name);
                setSurname(json.surname);
                setEmail(json.email);
                setConfirmed(json.confirmed);
                setProgress(json.progress);
                setFinish(json.finish);
                setIsSuccess(json.finish ? '' : json.success);
                setTypes(json.finish ? '' : json.types);
                setDays(json.finish ? '' : json.days);
                setWeek(json.finish ? '' : json.current_week);
                setIsDataLoaded(true);
            } else if (response.status === 401) {
                navigate(routes.login);
            }
        }

        if (!isDataLoaded) getUserData();
    }, []);


    const logout = () => {
        async function connect() {
            const response = await fetch(`${url}api/user/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok || response.status === 401) {
                setIsDataLoaded(false);
                setName();
                setSurname();
                setEmail();
                setConfirmed();
                setProgress();
                setFinish();
                setIsSuccess();
                setTypes();
                setDays();
                setWeek();
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
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setIsDataLoaded(false);
                setName();
                setSurname();
                setEmail();
                setConfirmed();
                setProgress();
                setFinish();
                setIsSuccess();
                setTypes();
                setDays();
                setWeek();
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
        if (!isDataLoaded) {
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