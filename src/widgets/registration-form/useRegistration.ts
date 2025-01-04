import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL, routes } from '@shared';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [surname, setSurname] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('');
  const [confuse, setConfuse] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setNameError('');
    setSurnameError('');
    setEmailError('');
    setPasswordError('');
    setRepeatedPasswordError('');

    if (
      name &&
      surname &&
      email &&
      password.length > 5 &&
      password === repeatedPassword
    ) {
      setLoading(true);
      try {
        const response = await fetch(`${URL}api/user/register`, {
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
      } catch {
        setLoading(false);
        setConfuse(true);
      }
    } else {
      setNameError(name ? '' : 'Введите имя');
      setSurnameError(surname ? '' : 'Введите фамилию');
      setEmailError(email ? '' : 'Введите почту');
      setPasswordError(
        password.length > 5 ? '' : 'Минимальная длина пароля - 6 смиволов'
      );
      setRepeatedPasswordError(
        password === repeatedPassword ? '' : 'Пароли не совпадают'
      );
    }
  };

  return {
    loading,
    setLoading,
    name,
    setName,
    nameError,
    setNameError,
    surname,
    setSurname,
    surnameError,
    setSurnameError,
    email,
    setEmail,
    emailError,
    setEmailError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    repeatedPassword,
    setRepeatedPassword,
    repeatedPasswordError,
    setRepeatedPasswordError,
    confuse,
    handleRegister,
  };
};
