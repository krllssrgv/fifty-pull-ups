import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "widgets/index";
import { url } from "shared/index";
import { Acts, Week } from "entities/index";
import { routes } from "shared/index";


function MainPage() {
    const [loaded, setLoaded] = useState(false),
          [displayedAct, setDisplayedAct] = useState(0),
          [page, setPage] = useState(0),

          [progress, setProgress] = useState(),
          [isSuccess, setIsSuccess] = useState(false),
          [name, setName] = useState(),

          [types, setTypes] = useState(),
          [days, setDays] = useState(),
          [week, setWeek] = useState();

    let navigate = useNavigate();


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
            
            if (response.ok) {
                const json = await response.json();
                setName(json.name);
                setProgress(json.progress);
                setIsSuccess(json.success);
                setWeek(json.current_week);
                setTypes(json.types);
                setDays(json.days);
                setLoaded(true);
            } else {
                if (response.status === 401) {
                    console.log(1);
                    navigate(routes.login);
                } else {
                    console.log(response.status);
                }
            }
        }

        getData();
    }, []);


    const postDone = (x) => {
        async function setDone() {
            const response = await fetch(`${url}api/act/set_day_as_done`, {
                method: 'POST',
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
                <></>
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