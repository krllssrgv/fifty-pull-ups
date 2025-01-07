import { useState } from 'react';
import styles from './account.module.scss';

export const useMore = () => {
  const [more, setMore] = useState<'init' | 'open' | 'close'>('init');

  return {
    onMore: () =>
      setMore((prevMore) => {
        if (prevMore === 'init' || prevMore === 'close') {
          return 'open';
        } else {
          return 'close';
        }
      }),
    containerClasses: (() => {
      if (more === 'init') {
        return [styles.more];
      } else if (more === 'close') {
        return [styles.more, styles.more_closed];
      } else {
        return [styles.more, styles.more_opened];
      }
    })(),
    buttonClasses: (() => {
      if (more === 'init') {
        return [styles.more_button];
      } else if (more === 'close') {
        return [styles.more_button, styles.more_button_closed];
      } else {
        return [styles.more_button, styles.more_button_opened];
      }
    })(),
  };
};
