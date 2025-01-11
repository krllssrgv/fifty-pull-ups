import type { Day } from '@entities';
import { Act } from '@entities';
import { ConfirmButton } from '@shared';
import { useActs } from './use-acts';
import styles from './acts.module.scss';

type Props = {
  day: Day | null;
};

export const Acts = ({ day }: Props) => {
  const { acts, properties, handleReadiness } = useActs();

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
