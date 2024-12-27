import {createContext, PropsWithChildren} from 'react';

import {User} from 'types/serviceType';

export const UserInfoContext = createContext<User | null>(null);

const UserInfoProvider = ({children, ...props}: PropsWithChildren<User>) => {
  return <UserInfoContext.Provider value={props}>{children}</UserInfoContext.Provider>;
};

export default UserInfoProvider;
