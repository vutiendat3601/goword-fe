import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext, { UserInfo, unauthUser } from '../../context/UserContext';
import { generateTokenByRefreshToken } from '../../services/auth-service';
import Spinner from '../spinner/Spinner';

interface ProtectedRouteProps {
  component: JSX.Element;
}

function ProtectedRoute({ component }: ProtectedRouteProps): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserInfo>(unauthUser.userInfo);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuthData() {
      const userInfo = await generateTokenByRefreshToken();
      if (userInfo && setUserInfo && setAuthenticated) {
        setUserInfo(userInfo);
        setAuthenticated(true);
      } else {
        navigate(`/auth/sign-in`);
      }
    }
    checkAuthData();
  }, [navigate]);
  return (
    <>
      {authenticated ? (
        <UserContext.Provider
          value={{ userInfo, setUserInfo, authenticated, setAuthenticated }}
        >
          {component}
        </UserContext.Provider>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default ProtectedRoute;
