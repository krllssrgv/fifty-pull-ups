import { useState, useEffect } from 'react';
import { Week, Acts, Progress, Account } from '@widgets';
import { useNavigation } from '@features';
import { selectUserData, selectUserActs } from '@entities';
import { useAppSelector } from '@shared';
import styles from './main-page.module.scss';

export const MainPage = () => {
  const [displayedAct, setDisplayedAct] = useState(0);
  const user = useAppSelector(selectUserData);
  const acts = useAppSelector(selectUserActs);

  useEffect(() => {
    document.title = 'Текущая неделя';
  }, []);

  useNavigation();

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

        <div className={styles.main}>
          <Week setDisplayedAct={setDisplayedAct} />
          <Acts day={displayedAct ? acts.days[displayedAct - 1] : null} />
        </div>
      </div>
    );
  }
};
