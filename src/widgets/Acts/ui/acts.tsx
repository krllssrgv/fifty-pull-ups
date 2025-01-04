import classNames from 'classnames';
import {
  ConfirmButton,
  narrowGrip,
  directGrip,
  wideGrip,
  reverseGrip,
  turner,
} from '@shared';
import styles from './acts.module.scss';

export const Acts = (props) => {
  const properties = {
    straight: 'Прямой хват',
    narrow: 'Узкий хват',
    wide: 'Широкий хват',
    reverse: 'Обратный хват',
  };

  const { day, types, postDone, page, setPage } = props,
    displayedImg = {
      straight: directGrip,
      narrow: narrowGrip,
      wide: wideGrip,
      reverse: reverseGrip,
    };

  const turn = (direction) => {
    if (direction === 'left' && page > 0) {
      setPage((prev) => prev - 1);
    } else if (direction === 'right' && page < types.length - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const renderButton = () => {
    if (day.done) {
      return <></>;
    } else {
      return (
        <ConfirmButton text="Выполнить" func={() => postDone(day.number)} />
      );
    }
  };

  const render = () => {
    if (day) {
      return (
        <div className={styles.container}>
          <div className={styles.headline}>День {day.number}</div>
          <div className={styles.slider}>
            <div className={styles.data}>Подход №{page + 1}</div>
            <div className={styles.data}>
              Количество:{' '}
              {day.acts[page] == 888 ? 'Максимально' : day.acts[page]}
            </div>
            <div className={styles.data}>{properties[types[page]]}</div>

            <div className={styles.img}>
              <img src={displayedImg[types[page]]} alt="" />
            </div>

            <div
              className={classNames(
                styles.turners,
                styles.left_btn,
                page === 0 ? styles.disabled_btn : null
              )}
              onClick={() => turn('left')}
            >
              <img src={turner} alt="left" />
            </div>
            <div
              className={classNames(
                styles.turners,
                styles.right_btn,
                page === types.length - 1 ? styles.disabled_btn : null
              )}
              onClick={() => turn('right')}
            >
              <img src={turner} alt="right" />
            </div>
          </div>
          {renderButton()}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return <>{render()}</>;
};
