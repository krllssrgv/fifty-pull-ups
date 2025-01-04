import { useEffect } from 'react';
import { LoginForm } from '@widgets';
import styles from './login-page.module.scss';

export const LoginPage = () => {
  useEffect(() => {
    document.title = 'Авторизация';
  }, []);

  return (
    <div className={styles.window}>
      <LoginForm />
    </div>
  );
};
