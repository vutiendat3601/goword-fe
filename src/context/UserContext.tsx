import { createContext } from 'react';

interface UserInfo {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  roles: string[];
  permissions: string[];
}

interface UserContextProps {
  userInfo: UserInfo;
  authenticated: boolean;
  setUserInfo?: (userInfo: UserInfo) => void;
  setAuthenticated?: (authenticated: boolean) => void;
}

const emptyUserInfo: UserInfo = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  roles: [],
  permissions: [],
};

const unauthUser: UserContextProps = {
  userInfo: emptyUserInfo,
  authenticated: false,
};

const UserContext: React.Context<UserContextProps> = createContext(unauthUser);

export type { UserInfo };
export { unauthUser };
export default UserContext;
