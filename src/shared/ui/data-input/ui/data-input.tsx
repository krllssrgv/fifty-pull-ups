import type { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import styles from './data-input.module.scss';

type Props = {
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  error: string;
  extraClassName?: string;
};

export const DataInput = ({
  type,
  value,
  setValue,
  placeholder,
  error,
}: Props) => {
  return (
    <div>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <div className={classNames(styles.border, error ? styles.border_error : null)}></div>
      <div className={styles.error}>{error}</div>
    </div>
  );
};
