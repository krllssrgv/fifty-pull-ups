import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Loading } from "widgets";
import { url, routes } from "shared";
import { AppContext } from "app/AppProvider";
import { Week, Acts } from "entities/index";
import styles from './MainPage.module.scss';


function MainPage() {
    const [displayedAct, setDisplayedAct] = useState(0),
          [page, setPage] = useState(0),
          { isDataLoaded, setIsDataLoaded,
          name, setName,
          surname, setSurname,
          email, setEmail,
          confirmed, setConfirmed,
          progress, setProgress,
          finish, setFinish,
          isSuccess, setIsSuccess,
          types, setTypes,
          days, setDays,
          week, setWeek } = useContext(AppContext),
          navigate = useNavigate();


    useEffect(() => {
        document.title = 'Главная';

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


    const postDone = (x) => {
        async function setDone() {
            const response = await fetch(`${url}api/act/set_day_as_done`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({set_day: x})
            });

            if (response.ok) {
                setDays((prev) => {
                    const newDays = [{...prev[0]}, {...prev[1]}, {...prev[2]}];
                    newDays[x-1].done = true;
                    return newDays;
                });
            } else {
                console.log(response.status);
            }
        }
        
        setDone();
    }


    useEffect(() => {
        let check = true;
        if (days) {
            days.forEach((e) => {
                if (!e.done) check = false;
            });
            
            if (check) setIsSuccess('0');
        }
    }, [days]);


    const render = () => {
        if (isDataLoaded) {
            if (finish) {
                return(
                    <>
                        <Header progress={progress} name={name} />
                        <div className={styles.finish}>Программа выполнена!</div>
                    </>
                );
            } else {
                return(
                    <>
                        <Header progress={progress} name={name} />
                        <Week setDisplayedAct={setDisplayedAct} setPage={setPage} />
                        <Acts day={(displayedAct ? days[displayedAct - 1] : null)} types={types} postDone={postDone} page={page} setPage={setPage} />
                    </>
                );
            }
        } else {
            return(
                <div className={styles.loading}>
                    <Loading size="max" />
                </div>
            );
        }
    }
    

    return(
        <>
            { render() }
        </>
    );
}

export default MainPage;