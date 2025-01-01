import styles from './confirm-button.module.scss';

export const ConfirmButton = (props) => {
  const { text, func } = props;

  return (
    <button className={styles.button} onClick={() => func()}>
      {text}
    </button>
  );
};
