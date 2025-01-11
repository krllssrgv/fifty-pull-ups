import { selectUserForActs, setDayAsDone, setSuccess } from '@entities';
import { useAppDispatch, useAppSelector, URL } from '@shared';

export const useActs = () => {
  const properties = {
    straight: 'Прямой',
    narrow: 'Узкий',
    wide: 'Широкий',
    reverse: 'Обратный',
  };

  const { acts } = useAppSelector(selectUserForActs);
  const dispatch = useAppDispatch();

  const handleReadiness = async (x: number) => {
    try {
      const response = await fetch(`${URL}api/act/set_day_as_done`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ set_day: x }),
      });

      if (response.ok) {
        dispatch(setDayAsDone(x - 1));
        if (
          (acts.days[0].done && acts.days[1].done) ||
          (acts.days[0].done && acts.days[2].done) ||
          (acts.days[1].done && acts.days[2].done)
        ) {
          dispatch(setSuccess('0'));
        }
      }
    } catch {
      //
    }
  };

  return {
    acts,
    properties,
    handleReadiness,
  };
};
