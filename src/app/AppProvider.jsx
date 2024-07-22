import { useState, useEffect, createContext } from "react";
import { url } from "shared";

const AppContext = createContext();

function AppProvider(props) {
    const [isLogin, setIsLogin] = useState(false),
          [loading, setLoading] = useState(true),

          [name, setName] = useState(''),
          [surname, setSurname] = useState(''),
          [email, setEmail] = useState(''),
          [confirmed, setConfirmed] = useState(''),
          [progress, setProgress] = useState(),
          [finish, setFinish] = useState(),

          [isSuccess, setIsSuccess] = useState(false),
          [types, setTypes] = useState(),
          [days, setDays] = useState(),
          [week, setWeek] = useState();


    useEffect(() => {
        async function checkLogin() {
            const response = await fetch(`${url}api/user/check_login`, {
                method: 'GET',
                credentials: 'include'
            });
    
            if (response.ok) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        }
    
        checkLogin();
    }, []);


    useEffect(() => {
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
                setLoading(false);
            } else if (response.status === 401) {
                setLoading(false);
                setIsLogin(false);
            }
        }

        if (isLogin) {
            getUserData();
        }
    }, [isLogin]);


    return(
        <AppContext.Provider value={{
            isLogin, setIsLogin,
            loading, setLoading,
            name, setName,
            surname, setSurname,
            email, setEmail,
            confirmed, setConfirmed,
            progress, setProgress,
            finish, setFinish,
            isSuccess, setIsSuccess,
            types, setTypes,
            days, setDays,
            week, setWeek
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider};