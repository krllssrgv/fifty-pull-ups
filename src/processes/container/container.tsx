import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { selectUserAuth, fetchUser } from '@entities';
import { useAppSelector, useAppDispatch } from '@shared';
import styles from './container.module.scss';

export const Container = () => {
  const authorized = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorized === undefined) {
      dispatch(fetchUser());
    }
  }, [dispatch, authorized]);

  return (
    <div className={styles.background}>
      {authorized !== undefined ? (
        <Outlet />
      ) : (
        <div className={styles.loading}>
          <div className={styles.text}>Загружаем информацию</div>
          <div className={styles.circle}></div>
        </div>
      )}
    </div>
  );
};
