import { useState, useEffect } from "react";
import { Header } from "widgets/index";
import { url } from "shared/index";
import { Acts, Week } from "entities/index";


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


    useEffect(() => {
        document.title = 'Главная';
        
        async function getData() {
            const response = await fetch(`${url}api/get_user_acts`, {
                method: 'GET',
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
            }
        }


        function localData() {
            const json = {
                name: 'Name',
                progress: '30',
                success: '',
                current_week: 2,
                types: ['straight', 'reverse', 'narrow', 'reverse', 'straight'],
                days: [
                    {
                        number: 1,
                        done: true,
                        acts: [5, 4, 5, 4, 3]
                    },
                    {
                        number: 2,
                        done: true,
                        acts: [6, 5, 5, 6, 4]
                    },
                    {
                        number: 3,
                        done: true,
                        acts: [5, 6, 6, 5, 5]
                    }
                ]
            }


            setName(json.name);
            setProgress(json.progress);
            setIsSuccess('0');
            setWeek(json.current_week);
            setTypes(json.types);
            setDays(json.days);
            setLoaded(true);
        }

        getData();
        //localData();
    }, []);


    const postDone = (x) => {
        async function setDone() {
            const response = await fetch(`${url}api/set_day_as_done`, {
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