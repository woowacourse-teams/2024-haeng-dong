import {useNavigate} from 'react-router-dom';

import {Profile} from '@components/Design/components/Profile/Profile';
import useRequestSuspenseGetUserInfo from '@hooks/queries/auth/useRequestSuspenseGetUserInfo';

import {Flex, Text, TextButton} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

import MyPageLayout from './MyPageLayout';

const UserInfoSection = () => {
  const {userInfo} = useRequestSuspenseGetUserInfo();
  const {profileImage, nickname} = userInfo;

  return (
    <Flex justifyContent="spaceBetween" alignItems="center" margin="0 1rem">
      <Flex gap="1rem" alignItems="center">
        <Profile src={profileImage ?? getImageUrl('runningDog', 'png')} size="large" />
        <Text size="bodyBold" textColor="onTertiary">
          {nickname}
        </Text>
      </Flex>
    </Flex>
  );
};

const SettingSection = () => {
  const navigate = useNavigate();

  return (
    <Flex flexDirection="column" margin="0 1.5rem" gap="1rem">
      <TextButton textColor="onTertiary" textSize="body">
        닉네임 설정하기
      </TextButton>
      <TextButton textColor="onTertiary" textSize="body">
        기본 계좌 번호 설정하기
      </TextButton>
      <TextButton textColor="onTertiary" textSize="body" onClick={() => navigate(ROUTER_URLS.createdEvents)}>
        내가 만든 행사 목록 보기
      </TextButton>
      <TextButton textColor="onTertiary" textSize="body" onClick={() => navigate(ROUTER_URLS.withdraw)}>
        탈퇴하기
      </TextButton>
    </Flex>
  );
};

const MyPage = () => {
  return <MyPageLayout userInfoSection={<UserInfoSection />} settingSection={<SettingSection />} />;
};

export default MyPage;
