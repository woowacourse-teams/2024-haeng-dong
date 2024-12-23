import {useContext} from 'react';

import {UserInfoContext} from '@components/Loader/UserInfo/UserInfoProvider';

const useUserInfoContext = () => {
  const value = useContext(UserInfoContext);

  if (!value) {
    throw new Error('UserInfoProvider와 함께 사용해주세요.');
  }

  return value;
};

export default useUserInfoContext;
