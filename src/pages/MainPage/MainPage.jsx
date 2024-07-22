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
          { isLogin, loading, name, progress, finish, isSuccess, setIsSuccess, types, days, setDays, week } = useContext(AppContext),
          navigate = useNavigate();


    useEffect(() => {
        document.title = 'Главная';
    }, []);


    useEffect(() => {
        if (!isLogin && !loading) navigate(routes.login);
    }, [isLogin, loading]);


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


    const render = () => {
        if (loading) {
            return(
                <div className={styles.loading}>
                    <Loading size="max" />
                </div>
            );
        } else {
            if (isLogin) {
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
                            <Week isSuccess={isSuccess} setIsSuccess={setIsSuccess} doneDays={[days[0].done, days[1].done, days[2].done]} week={week} setDisplayedAct={setDisplayedAct} setPage={setPage} />
                            <Acts day={(displayedAct ? days[displayedAct - 1] : null)} types={types} postDone={postDone} page={page} setPage={setPage} />
                        </>
                    );
                }
            } else {
                return(<></>);
            }
        }
    }
    

    return(
        <>
            { render() }
        </>
    );
}

export default MainPage;