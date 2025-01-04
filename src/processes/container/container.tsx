import { Outlet } from 'react-router-dom';
import styles from './container.module.scss';

export const Container = () => {
  return (
    <div className={styles.background}>
      <Outlet />
    </div>
  );
};
