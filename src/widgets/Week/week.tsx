import type { Dispatch, SetStateAction } from 'react';
import { Button, ConfirmButton } from '@shared';
import { useWeek } from './use-week';
import styles from './week.module.scss';

type Props = {
  setDisplayedAct: Dispatch<SetStateAction<number>>;
};

export const Week = ({ setDisplayedAct }: Props) => {
  const { doneDays, isSuccess, week, successText, confirmSuccess } = useWeek();

  const renderSuccess = () => {
    switch (isSuccess) {
      case '0':
        return (
          <div className={styles.success}>
            <div className={styles.question}>
              Получилось ли выполнить указанное количество подтягиваний за эту
              неделю?
            </div>
            <div className={styles.buttons}>
              {successText ? (
                <div className={styles.loading}>{successText}</div>
              ) : (
                <>
                  <ConfirmButton
                    text={'Да'}
                    onClick={() => confirmSuccess(true)}
                    loading={false}
                    confuse={false}
                  />
                  <ConfirmButton
                    text={'Нет'}
                    onClick={() => confirmSuccess(false)}
                    loading={false}
                    confuse={false}
                  />
                </>
              )}
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
    <section className={styles.week}>
      <div className={styles.headline}>Вы сейчас на {week + 1} неделе</div>

      <div className={styles.acts}>
        <Button
          onClick={() => {
            setDisplayedAct(1);
          }}
          done={doneDays[0]}
        >
          День 1
        </Button>
        <Button
          onClick={() => {
            setDisplayedAct(2);
          }}
          done={doneDays[1]}
        >
          День 2
        </Button>
        <Button
          onClick={() => {
            setDisplayedAct(3);
          }}
          done={doneDays[2]}
        >
          День 3
        </Button>
      </div>

      {renderSuccess()}
    </section>
  );
};
