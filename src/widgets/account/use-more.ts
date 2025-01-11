import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '@entities';
import { URL, useAppDispatch, routes } from '@shared';
import styles from './account.module.scss';

export const useMore = () => {
  const [more, setMore] = useState<'init' | 'open' | 'close'>('init');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await fetch(`${URL}api/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok || response.status === 401) {
        dispatch(resetUser());
        navigate(routes.login);
      }
    } catch {
      //
    }
  };

  // const onRemoveProfile = async () => {
  //   try {
  //     const response = await fetch(`${URL}api/user/remove`, {
  //       method: 'POST',
  //       credentials: 'include',
  //     });

  //     if (response.ok) {
  //       dispatch(resetUser());
  //     }
  //   } catch {
  //     //
  //   }
  // };

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
    onLogout,
  };
};
