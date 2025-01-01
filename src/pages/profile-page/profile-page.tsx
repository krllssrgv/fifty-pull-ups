import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Header, Loading } from 'widgets';
import { url, routes } from 'shared';
import { AppContext } from 'app/AppProvider';
import { ConfirmButton, TextInput, ErrorField } from 'widgets';
import styles from './profile-page.module.scss';

function ProfilePage() {
  const [code, setCode] = useState(''),
    [codeError, setCodeError] = useState(''),
    { state, dispatch } = useContext(AppContext),
    navigate = useNavigate();

  useEffect(() => {
    document.title = 'Профиль';

    async function getUserData() {
      const response = await fetch(`${url}api/user/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        const json = await response.json();
        dispatch({
          type: 'SET_USER',
          payload: {
            name: json.name,
            surname: json.surname,
            email: json.email,
            confirmed: json.confirmed,
            progress: json.progress,
            finish: json.finish,
            isSuccess: String(json.success),
          },
        });

        dispatch({
          type: 'SET_ACTS',
          payload: {
            types: json.finish ? '' : json.types,
            days: json.finish ? '' : json.days,
            week: json.finish ? '' : json.current_week,
          },
        });

        dispatch({
          type: 'SET_DATA_LOADED',
          payload: true,
        });
      } else if (response.status === 401) {
        navigate(routes.login);
      }
    }

    if (!state.isDataLoaded) getUserData();
  }, []);

  const logout = () => {
    async function connect() {
      const response = await fetch(`${url}api/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok || response.status === 401) {
        dispatch({ type: 'RESET_STATE' });
        navigate(routes.login);
      }
    }

    connect();
  };

  const confirm = () => {
    setCodeError('');

    async function connect() {
      const response = await fetch(`${url}api/user/confirm_email`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });

      if (response.status === 204) {
        dispatch({
          type: 'SET_USER',
          payload: {
            ...state.user,
            confirmed: true,
          },
        });
      } else if (response.status === 401) {
        navigate(routes.login);
      } else if (response.status === 400) {
        const json = await response.json();
        if ('error' in json) {
          setCodeError(json.error);
        }
      }
    }

    connect();
  };

  const removeProfile = () => {
    async function connect() {
      const response = await fetch(`${url}api/user/remove`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        dispatch({ type: 'RESET_STATE' });
      }
    }

    connect();
  };

  const renderCheck = () => {
    if (state.user.confirmed) {
      return <></>;
    } else {
      return (
        <div className={classNames(styles.container)}>
          <div className={styles.data}>Подтвердите Email</div>
          <div className={styles.code}>
            <TextInput
              type="text"
              value={code}
              setValue={setCode}
              placeholder="Код"
              error={codeError}
            />

            <ErrorField text={codeError} />
          </div>
          <ConfirmButton text="Подтвердить" func={confirm} />
        </div>
      );
    }
  };

  const render = () => {
    if (!state.isDataLoaded) {
      return (
        <>
          <Loading size="max" />
        </>
      );
    } else {
      return (
        <>
          <Header progress={state.user.progress} name={state.user.name} />
          {renderCheck()}
          <div className={styles.container}>
            <div className={styles.data}>
              {state.user.name} {state.user.surname}
            </div>
            <div className={styles.email}>{state.user.email}</div>
            <div className={styles.exit}>
              <ConfirmButton text="Выйти" func={logout} />
            </div>
            <div className={styles.remove} onClick={removeProfile}>
              Удалить аккаунт
            </div>
          </div>
        </>
      );
    }
  };

  return <>{render()}</>;
}

export default ProfilePage;
