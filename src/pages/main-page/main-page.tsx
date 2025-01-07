import { useState, useEffect } from 'react';
import { Week, Acts, Progress, Account } from '@widgets';
import { useNavigation } from '@features';
import { selectUserData, selectUserActs } from '@entities';
import { useAppSelector } from '@shared';
import styles from './main-page.module.scss';

export const MainPage = () => {
  const [displayedAct, setDisplayedAct] = useState(0);
  const [page, setPage] = useState(0);
  const user = useAppSelector(selectUserData);
  const acts = useAppSelector(selectUserActs);

  useEffect(() => {
    document.title = 'Текущая неделя';
  }, []);

  useNavigation();

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

  if (user.finish) {
    return (
      <>
        <Account name={user.name} surname={user.surname} />
        <div className={styles.finish}>Программа выполнена!</div>
      </>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Account name={user.name} surname={user.surname} />
          <Progress progress={user.progress} />
        </div>

        <Week setDisplayedAct={setDisplayedAct} setPage={setPage} />
        {/* <Acts
          day={displayedAct ? acts.days[displayedAct - 1] : null}
          types={acts.types}
          postDone={'postDone'}
          page={page}
          setPage={setPage}
        /> */}
      </div>
    );
  }
};
