import { useEffect } from 'react';
import { RegisterForm } from '@widgets';
import styles from './registration-page.module.scss';

export const RegistrationPage = () => {
  useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  return (
    <div className={styles.window}>
      <RegisterForm />
    </div>
  );
};
