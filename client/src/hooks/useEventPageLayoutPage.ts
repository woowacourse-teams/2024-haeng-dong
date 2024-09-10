import {useMatch} from 'react-router-dom';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import getEventPageUrlByEnvironment from '@utils/getEventPageUrlByEnvironment';
import isMobileDevice from '@utils/isMobileDevice';

import {ROUTER_URLS} from '@constants/routerUrls';

import useRequestGetEventName from './queries/useRequestGetEventName';
import useNavSwitch from './useNavSwitch';

const useEventPageLayoutPage = () => {
  const navProps = useNavSwitch();
  const {data} = useRequestGetEventName();

  const eventName = data?.eventName ?? '';
  const eventId = getEventIdByUrl();

  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;
  const isLoginPage = useMatch(ROUTER_URLS.eventLogin) !== null;

  const url = getEventPageUrlByEnvironment(eventId, 'home');

  // OS 공유 기능
  const shareInfo = {
    title: `[행동대장]\n${eventName}에 대한 정산을 시작할게요:)`,
    text: '아래 링크에 접속해서 정산 내역을 확인해 주세요!',
    url,
  };

  const isMobile = isMobileDevice();

  // 모바일이 아닌 기기는 단순 텍스트 복사
  // 모바일 기기에서는 카카오톡 공유를 사용
  const onInviteButtonClick = () => {
    if (!isMobile) return;

    shareUnSupportedOSShareEnvUsingKakao();
  };

  const shareUnSupportedOSShareEnvUsingKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareInfo.title,
        description: shareInfo.text,
        imageUrl:
          'https://wooteco-crew-wiki.s3.ap-northeast-2.amazonaws.com/%EC%9B%A8%EB%94%94%286%EA%B8%B0%29/g583lirp8yg.jpg',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttonTitle: '정산 확인하기',
    });
  };

  const shareText = `[행동대장]\n"${eventName}"에 대한 정산을 시작할게요:)\n아래 링크에 접속해서 정산 내역을 확인해 주세요!\n${url}`;

  return {
    navProps,
    isAdmin,
    eventName,
    isLoginPage,
    shareText,
    onInviteButtonClick,
  };
};

export default useEventPageLayoutPage;
