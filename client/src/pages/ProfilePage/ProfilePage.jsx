import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "widgets";
import { url, routes } from "shared";
import { ConfirmButton } from "widgets";
import styles from './ProfilePage.module.scss';


function ProfilePage() {
    const [name, setName] = useState(''),
          [surname, setSurname] = useState(''),
          [email, setEmail] = useState(''),
          [confirmed, setConfirmed] = useState(''),
          [progress, setProgress] = useState();

    const navigate = useNavigate();


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

            if (response.ok) {
                const json = await response.json();
                setName(json.name);
                setSurname(json.surname);
                setEmail(json.email);
                setProgress(json.progress);
                setConfirmed(json.confirmed);
            } else {
                if (response.status === 401) {
                    navigate(routes.login);
                }
            }
        }

        getUserData();        
    }, []);


    const logout = () => {

    }


    const renderCheck = () => {
        if (confirmed) {
            return(<></>);
        } else {
            return(
                <div className={styles.confirm}>
                </div>
            );
        }
    }


    return(
        <>
            <Header progress={progress} name={name} />
            <div className={styles.container}>
                <div className={styles.data}>{name} {surname}</div>
                <div className={styles.email}>{email}</div>
                {}
                <div className={styles.exit}>
                    <ConfirmButton text='Выйти' func={logout} />
                </div>
            </div>
        </>
    );
}

export default ProfilePage;