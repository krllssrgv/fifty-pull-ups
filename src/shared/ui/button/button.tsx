import { ReactNode, FC } from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

type Props = {
  onClick: () => void;
  children: ReactNode;
  active?: boolean;
  done?: boolean;
};

export const Button: FC<Props> = ({
  onClick,
  active = false,
  done = false,
  children,
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        done ? styles.done : null,
        active ? styles.active : null
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
