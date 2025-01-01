import styles from './error-field.module.scss';

export const ErrorField = (props) => {
  const { text } = props;

  return <div className={styles.error}>{text}</div>;
};
