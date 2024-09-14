import getEventIdByUrl from '@utils/getEventIdByUrl';
import getEventPageUrlByEnvironment from '@utils/getEventPageUrlByEnvironment';

import useRequestGetEventName from './queries/useRequestGetEventName';

const useShareEvent = (isMobile: boolean) => {
  const {data} = useRequestGetEventName();
  const eventName = data?.eventName ?? '';

  const eventId = getEventIdByUrl();
  const url = getEventPageUrlByEnvironment(eventId, 'home');

  const shareInfo = {
    title: `[행동대장]\n${eventName}에 대한 정산을 시작할게요:)`,
    text: '아래 링크에 접속해서 정산 내역을 확인해 주세요!',
    url,
  };

  // 모바일이 아닌 기기는 단순 텍스트 복사
  // 모바일 기기에서는 카카오톡 공유를 사용
  const onShareButtonClick = () => {
    if (!isMobile) return;

    kakaoShare();
  };

  const kakaoShare = () => {
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

  const shareText = `${shareInfo.title}\n${shareInfo.text}\n${url}`;

  return {
    shareText,
    onShareButtonClick,
  };
};

export default useShareEvent;
