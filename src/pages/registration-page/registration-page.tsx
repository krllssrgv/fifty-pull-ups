import { useEffect } from 'react';
import { RegisterForm } from '@widgets';
import { useNavigation } from '@features';
import styles from './registration-page.module.scss';

export const RegistrationPage = () => {
  useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  useNavigation();

  return (
    <div className={styles.window}>
      <RegisterForm />
    </div>
  );
};
