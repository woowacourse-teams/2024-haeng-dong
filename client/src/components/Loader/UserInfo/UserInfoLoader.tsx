import {Outlet} from 'react-router-dom';

import useRequestGetUserInfo from '@hooks/queries/auth/useRequestGetUserInfo';

import UserInfoProvider from './UserInfoProvider';

const UserInfoLoader = () => {
  const {userInfo} = useRequestGetUserInfo({enableInitialData: false});

  return (
    <UserInfoProvider {...userInfo}>
      <Outlet />
    </UserInfoProvider>
  );
};

export default UserInfoLoader;
