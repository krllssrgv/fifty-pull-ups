import { useState, useEffect } from 'react';
import { Week, Acts, Header } from '@widgets';
import { useNavigation } from '@features';
import styles from './main-page.module.scss';

export const MainPage = () => {
  const [displayedAct, setDisplayedAct] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    document.title = 'Текущая неделя';
  }, []);

  useNavigation();

  // useEffect(() => {
  //   document.title = 'Главная';

  //   async function getUserData() {
  //     const response = await fetch(`${url}api/user/user`, {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     });

  //     if (response.status === 200) {
  //       const json = await response.json();
  //       dispatch({
  //         type: 'SET_USER',
  //         payload: {
  //           name: json.name,
  //           surname: json.surname,
  //           email: json.email,
  //           confirmed: json.confirmed,
  //           progress: json.progress,
  //           finish: json.finish,
  //           isSuccess: String(json.success),
  //         },
  //       });

  //       dispatch({
  //         type: 'SET_ACTS',
  //         payload: {
  //           types: json.finish ? '' : json.types,
  //           days: json.finish ? '' : json.days,
  //           week: json.finish ? '' : json.current_week,
  //         },
  //       });

  //       dispatch({
  //         type: 'SET_DATA_LOADED',
  //         payload: true,
  //       });
  //     } else if (response.status === 401) {
  //       navigate(routes.login);
  //     }
  //   }

  //   if (!state.isDataLoaded) getUserData();
  // }, []);

  // const postDone = (x) => {
  //   async function setDone() {
  //     const response = await fetch(`${url}api/act/set_day_as_done`, {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ set_day: x }),
  //     });

  //     if (response.ok) {
  //       const newDays = ((prev) => {
  //         const newDays = [{ ...prev[0] }, { ...prev[1] }, { ...prev[2] }];
  //         newDays[x - 1].done = true;
  //         return newDays;
  //       })(state.acts.days);

  //       dispatch({
  //         type: 'SET_ACTS',
  //         payload: {
  //           ...state.acts,
  //           days: newDays,
  //         },
  //       });
  //     } else {
  //       console.log(response.status);
  //     }
  //   }

  //   setDone();
  // };

  // useEffect(() => {
  //   let check = true;
  //   if (state.acts.days) {
  //     state.acts.days.forEach((e) => {
  //       if (!e.done) check = false;
  //     });

  //     if (check && state.user.isSuccess === '') {
  //       dispatch({
  //         type: 'SET_USER',
  //         payload: {
  //           ...state.user,
  //           isSuccess: '0',
  //         },
  //       });
  //     }
  //   }
  // }, [state.acts.days]);

  // const render = () => {
  //   if (state.isDataLoaded) {
  //     if (state.user.finish) {
  //       return (
  //         <>
  //           <Header progress={state.user.progress} name={state.user.name} />
  //           <div className={styles.finish}>Программа выполнена!</div>
  //         </>
  //       );
  //     } else {
  //       return (
  //         <>
  //           <Header progress={state.user.progress} name={state.user.name} />
  //           <Week setDisplayedAct={setDisplayedAct} setPage={setPage} />
  //           <Acts
  //             day={displayedAct ? state.acts.days[displayedAct - 1] : null}
  //             types={state.acts.types}
  //             postDone={'postDone'}
  //             page={page}
  //             setPage={setPage}
  //           />
  //         </>
  //       );
  //     }
  //   } else {
  //     return (
  //       <div className={styles.loading}>
  //         <Loading size="max" />
  //       </div>
  //     );
  //   }
  // };

  return <></>;
};
