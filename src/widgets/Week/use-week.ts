import { useState } from 'react';
import { selectUserForWeek, setSuccess } from '@entities';
import { URL, useAppSelector, useAppDispatch } from '@shared';

export const useWeek = () => {
  const { doneDays, isSuccess, week } = useAppSelector(selectUserForWeek);
  const [successText, setSuccessText] = useState('');
  const dispatch = useAppDispatch();

  const confirmSuccess = async (result: boolean) => {
    setSuccessText('Отправка...');
    try {
      const response = await fetch(`${URL}api/act/send_result`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ success: result }),
      });

      if (response.ok) {
        const json = await response.json();
        dispatch(setSuccess(json.success));
      } else {
        setSuccessText('Произошла ошибка');
      }
    } catch {
      setSuccessText('Произошла ошибка');
    }
  };

  return {
    doneDays,
    isSuccess,
    week,
    successText,
    confirmSuccess,
  };
};
