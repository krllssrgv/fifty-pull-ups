import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './container.module.scss';

export const Container = () => {
  const loading = false;
  const loadingState = 'Загружаем информацию';

  useEffect(() => {
    document.title = 'FPU';
  }, []);

  return (
    <div className={styles.background}>
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.text}>{loadingState}</div>
          <div className={styles.circle}></div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
