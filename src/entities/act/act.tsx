import styles from './act.module.scss';

type Props = {
  number: number;
  quantity: number;
  type: string;
};

export const Act = ({ number, quantity, type }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.number}>Подход №{number}</div>
      <div className={styles.data}>{type} хват</div>
      <div className={styles.data}>Количество: {quantity}</div>
    </div>
  );
};
