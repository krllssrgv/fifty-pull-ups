import classNames from 'classnames';
import { useMore } from './use-more';
import styles from './account.module.scss';

type Props = {
  name: string;
  surname: string;
};

export const Account = ({ name, surname }: Props) => {
  const { onMore, containerClasses, buttonClasses, onLogout } = useMore();

  return (
    <div className={styles.profile}>
      <div className={styles.mainline} onClick={onMore}>
        <div className={styles.data}>
          <div className={styles.circle}></div>
          <div>
            {name} {surname}
          </div>
        </div>
        <div className={classNames(...buttonClasses)}>{'<'}</div>
      </div>

      <div className={classNames(...containerClasses)}>
        <button className={styles.logout} onClick={onLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
};
