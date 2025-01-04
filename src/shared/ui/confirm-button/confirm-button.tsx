import { type MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './confirm-button.module.scss';

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  confuse?: boolean;
};

export const ConfirmButton = ({
  text,
  onClick,
  loading = false,
  confuse = false,
}: Props) => {
  if (confuse) {
    return (
      <div className={styles.confuse}>
        На стороне приложения произошла ошибка. Попробуйте позже.
      </div>
    );
  } else {
    return (
      <button
        className={classNames(styles.button, loading ? styles.loading : null)}
        onClick={(event) => (loading ? null : onClick(event))}
      >
        {loading ? 'Загрузка..' : text}
      </button>
    );
  }
};
