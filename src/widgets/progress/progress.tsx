import styles from './progress.module.scss';

type Props = {
  progress: string;
};

export const Progress = ({ progress }: Props) => {
  return (
    <div className={styles.progress}>
      <div className={styles.title}>Ваш прогресс - {progress}%</div>
      <div className={styles.line}>
        <div
          className={styles.done}
          style={{ width: `${progress === undefined ? 0 : progress}%` }}
        ></div>
      </div>
    </div>
  );
};
