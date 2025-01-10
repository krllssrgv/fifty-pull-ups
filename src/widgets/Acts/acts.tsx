import type { Day } from '@entities';
import { selectUserForActs, setDayAsDone, Act, setSuccess } from '@entities';
import { ConfirmButton, URL, useAppSelector, useAppDispatch } from '@shared';
import styles from './acts.module.scss';

type Props = {
  day: Day | null;
};

export const Acts = ({ day }: Props) => {
  const { acts } = useAppSelector(selectUserForActs);
  const dispatch = useAppDispatch();

  const properties = {
    straight: 'Прямой',
    narrow: 'Узкий',
    wide: 'Широкий',
    reverse: 'Обратный',
  };

  const handleReadiness = async (x: number) => {
    try {
      const response = await fetch(`${URL}api/act/set_day_as_done`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ set_day: x }),
      });

      if (response.ok) {
        dispatch(setDayAsDone(x - 1));
        if (
          (acts.days[0].done && acts.days[1].done) ||
          (acts.days[0].done && acts.days[2].done) ||
          (acts.days[1].done && acts.days[2].done)
        ) {
          dispatch(setSuccess('0'));
        }
      }
    } catch {
      //
    }
  };

  const renderButton = () => {
    if (day && day.done) {
      return <></>;
    } else if (day && !day.done) {
      return (
        <ConfirmButton
          text="Выполнить"
          onClick={() => handleReadiness(day.number)}
        />
      );
    }
  };

  if (day) {
    return (
      <section className={styles.act}>
        <div className={styles.headline}>День {day.number}</div>
        <div className={styles.acts}>
          {day.acts.map((element, i) => (
            <Act
              key={i} // я знаю, что так нельзя, но в данном проекте у дней нет уникальных id в бд
              quantity={element}
              number={i + 1}
              type={properties[acts.types[i]]}
            />
          ))}
        </div>
        {renderButton()}
      </section>
    );
  } else {
    return <></>;
  }
};
