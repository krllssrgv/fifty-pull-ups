import { type MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './confirm-button.module.scss';

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

export const ConfirmButton = ({
  text,
  onClick,
  loading = false,
}: Props) => {
  return (
    <button
      className={classNames(
        styles.button,
        loading ? styles.loading : null
      )}
      onClick={(event) => (loading ? null : onClick(event))}
    >
      {loading ? 'Загрузка..' : text}
    </button>
  );
};
