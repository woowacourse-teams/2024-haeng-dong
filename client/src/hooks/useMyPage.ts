import useRequestGetUserInfo from './queries/auth/useRequestGetUserInfo';

const useMyPage = () => {
  const {userInfo} = useRequestGetUserInfo();

  return {
    profileImage: userInfo.profileImage,
    nickname: userInfo.nickname,
  };
};

export default useMyPage;
