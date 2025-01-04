import { Outlet } from 'react-router-dom';
import styles from './auth-container.module.scss';

export const AuthContainer = () => {
  return (
    <div className={styles.background}>
      <div className={styles.window}>
        <Outlet />
      </div>
    </div>
  );
};
