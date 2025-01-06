import { useEffect } from 'react';
import { LoginForm } from '@widgets';
import { useNavigation } from '@features';
import styles from './login-page.module.scss';

export const LoginPage = () => {
  useEffect(() => {
    document.title = 'Авторизация';
  }, []);

  useNavigation();

  return (
    <div className={styles.window}>
      <LoginForm />
    </div>
  );
};
