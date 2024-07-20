import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Loading } from "widgets";
import { url, routes } from "shared";
import { Week, Acts } from "entities/index";
import styles from './MainPage.module.scss';


function MainPage() {
    const [loaded, setLoaded] = useState(false),
          [displayedAct, setDisplayedAct] = useState(0),
          [page, setPage] = useState(0),

          [progress, setProgress] = useState(),
          [isSuccess, setIsSuccess] = useState(false),
          [name, setName] = useState(),

          [types, setTypes] = useState(),
          [days, setDays] = useState(),
          [week, setWeek] = useState(),

          [finish, setFinish] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        document.title = 'Главная';
        
        async function getData() {
            const response = await fetch(`${url}api/act/get_acts`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.status === 200) {
                const json = await response.json();
                if (json.finish) {
                    setFinish(true);
                    setName(json.name);
                    setProgress(json.progress);
                } else {
                    setName(json.name);
                    setProgress(json.progress);
                    setIsSuccess(json.success);
                    setWeek(json.current_week);
                    setTypes(json.types);
                    setDays(json.days);
                    setLoaded(true);
                }
            } else if (response.status === 401) {
                navigate(routes.login);
            } else {
                console.log(response.status);
            }
        }

        getData();
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


    const render = () => {
        if (finish) {
            return(
                <>
                    <Header progress={progress} name={name} />
                    <div className={styles.finish}>Программа выполнена!</div>
                </>
            );
        } else {
            if (loaded) {
                return(
                    <>
                        <Header progress={progress} name={name} />
                        <Week isSuccess={isSuccess} setIsSuccess={setIsSuccess} doneDays={[days[0].done, days[1].done, days[2].done]} week={week} setDisplayedAct={setDisplayedAct} setPage={setPage} />
                        <Acts day={(displayedAct ? days[displayedAct - 1] : null)} types={types} postDone={postDone} page={page} setPage={setPage} />
                    </>
                );
            } else {
                return(
                    <div className={styles.loading}>
                        <Loading size="max" />
                    </div>
                );
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