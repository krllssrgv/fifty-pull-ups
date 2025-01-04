import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@widgets';
import { routes, url, Loading } from '@shared';

function RegistrationPage() {
  const navigate = useNavigate(),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Регистрация';

    async function checkLogin() {
      const response = await fetch(`${url}api/user/check_login`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setLoading(false);
        navigate(routes.main);
      } else {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  const render = () => {
    if (loading) {
      return (
        <>
          <Loading size="max" />
        </>
      );
    } else {
      return <RegisterForm />;
    }
  };

  return <>{render()}</>;
}

export default RegistrationPage;
