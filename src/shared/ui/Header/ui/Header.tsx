import { Link } from 'react-router-dom';
import { routes } from 'shared';
import styles from './header.module.scss';

export const Header = (props) => {
  const { name, progress } = props;

  return (
    <header>
      <div className={styles.container}>
        <Link to={routes.main} className={styles.progress}>
          <div className={styles.title}>Ваш прогресс - {progress}%</div>
          <div className={styles.line}>
            <div
              className={styles.done}
              style={{ width: `${progress === undefined ? 0 : progress}%` }}
            ></div>
          </div>
        </Link>

        <Link to={routes.profile} className={styles.profile}>
          <div className={styles.circle}></div>
          <div className={styles.name}>{name}</div>
        </Link>
      </div>
    </header>
  );
};
