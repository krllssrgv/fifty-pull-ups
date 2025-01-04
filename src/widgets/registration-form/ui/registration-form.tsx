import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  routes,
  url,
  DataInput,
  ConfirmButton,
  Loading,
} from '@shared';
import styles from './registration-form.module.scss';

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false),
    [name, setName] = useState(''),
    [nameError, setNameError] = useState(''),
    [surname, setSurname] = useState(''),
    [surnameError, setSurnameError] = useState(''),
    [email, setEmail] = useState(''),
    [emailError, setEmailError] = useState(''),
    [password, setPassword] = useState(''),
    [passwordError, setPasswordError] = useState(''),
    [repeatedPassword, setRepeatedPassword] = useState(''),
    [repeatedPasswordError, setRepeatedPasswordError] = useState(''),
    navigate = useNavigate();

  const register = () => {
    setNameError('');
    setSurnameError('');
    setEmailError('');
    setPasswordError('');
    setRepeatedPasswordError('');
    setLoading(true);

    async function connect() {
      const response = await fetch(`${url}api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          repeatedPassword: repeatedPassword,
          name: name,
          surname: surname,
        }),
      });

      if (response.ok) {
        setLoading(false);
        navigate(routes.login);
      } else {
        setLoading(false);
        if (response.status === 400) {
          const json = await response.json();
          if ('email' in json) setEmailError(json.email);
          if ('password' in json) setPasswordError(json.password);
          if ('repeatedPassword' in json)
            setRepeatedPasswordError(json.repeatedPassword);
          if ('name' in json) setNameError(json.name);
          if ('surname' in json) setSurnameError(json.surname);
        } else {
          console.log(response.status);
        }
      }
    }

    connect();
  };

  const renderButton = () => {
    if (loading) {
      return <Loading size={'min'} />;
    } else {
      return <ConfirmButton text="Зарегистрироваться" func={register} />;
    }
  };

  return (
    <div className={styles.container}>
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

      {renderButton()}
    </div>
  );
};
