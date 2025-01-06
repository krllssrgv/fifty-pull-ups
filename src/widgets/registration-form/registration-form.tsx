import { Link } from 'react-router-dom';
import { routes, DataInput, ConfirmButton } from '@shared';
import { useRegistration } from './use-registration';
import styles from './registration-form.module.scss';

export const RegisterForm = () => {
  const {
    loading,
    name,
    setName,
    nameError,
    surname,
    setSurname,
    surnameError,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    repeatedPassword,
    setRepeatedPassword,
    repeatedPasswordError,
    handleRegister,
    confuse,
  } = useRegistration();

  return (
    <>
      <div className={styles.headline}>Регистрация</div>

      <div className={styles.inputs}>
        <DataInput
          type="text"
          value={name}
          setValue={setName}
          placeholder="Имя"
          error={nameError}
        />

        <DataInput
          type="text"
          value={surname}
          setValue={setSurname}
          placeholder="Фамилия"
          error={surnameError}
        />

        <DataInput
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

        <DataInput
          type="password"
          value={repeatedPassword}
          setValue={setRepeatedPassword}
          placeholder="Пароль повторно"
          error={repeatedPasswordError}
        />
      </div>

      <Link to={routes.login} className={styles.link}>
        Уже есть аккаунт? Войти!
      </Link>

      <ConfirmButton
        text="Зарегистрироваться"
        onClick={handleRegister}
        loading={loading}
        confuse={confuse}
      />
    </>
  );
};
