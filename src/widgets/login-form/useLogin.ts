import { useState } from 'react';
import { URL } from '@shared';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confuse, setConfuse] = useState(false);

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (email && password.length > 5) {
      setLoading(true);
      try {
        const response = await fetch(`${URL}api/user/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
          if (response.status === 401) {
            const json = await response.json();
            if ('email' in json) setEmailError(json.email);
            if ('password' in json) setPasswordError(json.password);
            console.log();
          } else {
            console.log(response.status);
          }
        }
      } catch {
        setLoading(false);
        setConfuse(true);
      }
    } else {
      setEmailError(email ? '' : 'Введите почту');
      setPasswordError(
        password.length > 5 ? '' : 'Минимальная длина пароля - 6 смиволов'
      );
    }
  };

  return {
    loading,
    email,
    setEmail,
    emailError,
    setEmailError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    handleLogin,
    confuse,
  };
};
