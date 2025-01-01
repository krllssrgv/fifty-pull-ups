import { useContext } from 'react';
import classNames from 'classnames';
import { AppContext } from 'app/AppProvider';
import { url } from 'shared';
import styles from './week.module.scss';

export const Week = (props) => {
  const { state, dispatch } = useContext(AppContext),
    { setDisplayedAct, setPage } = props,
    doneDays = [
      state.acts.days[0].done,
      state.acts.days[1].done,
      state.acts.days[2].done,
    ];

  const confirmSuccess = (result) => {
    async function sendResult() {
      dispatch({
        type: 'SET_USER',
        payload: {
          ...state.user,
          isSuccess: '',
        },
      });

      const response = await fetch(`${url}api/act/send_result`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ success: result }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        dispatch({
          type: 'SET_USER',
          payload: {
            ...state.user,
            isSuccess: json.success,
          },
        });
      } else {
        console.log(response.status);
      }
    }

    sendResult();
  };

  const renderSuccess = () => {
    switch (state.user.isSuccess) {
      case '0':
        return (
          <div className={styles.success}>
            <div className={styles.question}>
              Получилось ли выполнить указанное количество подтягиваний за эту
              неделю?
            </div>
            <div className={styles.buttons}>
              <div
                className={classNames(styles.btn, styles.false)}
                onClick={() => confirmSuccess(false)}
              >
                Нет
              </div>
              <div
                className={classNames(styles.btn, styles.true)}
                onClick={() => confirmSuccess(true)}
              >
                Да
              </div>
            </div>
          </div>
        );
      case '1':
        return (
          <div className={styles.success}>
            Вы подтвердили, что смогли выполнить указанное количество
            подтягиваний за эту неделю. Тренировки следующей недели будут
            доступны в понедельник.
          </div>
        );
      case '-1':
        return (
          <div className={styles.success}>
            Вы не смогли выполнить указанное количество подтягиваний за эту
            неделю. На следующей неделе необходимо повторить программу текущей
            недели. В понедельник тренировки будут обновлены.
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headline}>Ваша текущая неделя</div>

      <div className={styles.subheadline}>Неделя №{state.acts.week + 1}</div>

      <div className={styles.subheadline}>Тренировки:</div>

      <div className={styles.acts}>
        <div
          className={classNames(styles.act, doneDays[0] ? null : styles.active)}
          onClick={() => {
            setDisplayedAct(1);
            setPage(0);
          }}
        >
          День 1
        </div>

        <div
          className={classNames(styles.act, doneDays[1] ? null : styles.active)}
          onClick={() => {
            setDisplayedAct(2);
            setPage(0);
          }}
        >
          День 2
        </div>

        <div
          className={classNames(styles.act, doneDays[2] ? null : styles.active)}
          onClick={() => {
            setDisplayedAct(3);
            setPage(0);
          }}
        >
          День 3
        </div>
      </div>

      {renderSuccess()}
    </div>
  );
};
