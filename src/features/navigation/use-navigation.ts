import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUserAuth } from '@entities';
import { routes, useAppSelector } from '@shared';

export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authorized = useAppSelector(selectUserAuth);

  useEffect(() => {
    switch (authorized) {
      case undefined: {
        if (
          location.pathname === routes.main ||
          location.pathname === routes.profile
        ) {
          navigate(routes.login);
        }
        break;
      }

      case false: {
        if (
          location.pathname === routes.main ||
          location.pathname === routes.profile
        ) {
          navigate(routes.login);
        }
        break;
      }

      case true: {
        if (
          location.pathname === routes.login ||
          location.pathname === routes.registration
        ) {
          navigate(routes.main);
        }
        break;
      }
    }
  }, [authorized, location.pathname, navigate]);
};
