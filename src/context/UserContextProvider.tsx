import { useState } from 'react';
import UserContext, { UserInfo, unauthUser } from './UserContext';

interface UserContextProviderProps {
  children: any;
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>(unauthUser.userInfo);
  const [authenticated, setAuthenticated] = useState<boolean>(
    unauthUser.authenticated
  );

  return (
    <UserContext.Provider
      value={{ userInfo, authenticated, setAuthenticated, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
