import { Link } from 'react-router-dom';
import { routes, DataInput, ConfirmButton } from '@shared';
import { useLogin } from './use-login';
import styles from './login-form.module.scss';

export const LoginForm = () => {
  const {
    loading,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    handleLogin,
    confuse,
  } = useLogin();

  return (
    <>
      <div className={styles.headline}>Авторизация</div>

      <div className={styles.inputs}>
        <DataInput
          extraClassName={styles.text_input}
          type="text"
          value={email}
          setValue={setEmail}
          placeholder="Email"
          error={emailError}
        />

        <DataInput
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Пароль"
          error={passwordError}
        />
      </div>

      <Link to={routes.registration} className={styles.link}>
        Зарегистрироваться
      </Link>

      <ConfirmButton
        text="Войти"
        onClick={handleLogin}
        loading={loading}
        confuse={confuse}
      />
    </>
  );
};
