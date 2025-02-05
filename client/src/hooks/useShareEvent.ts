import getEventIdByUrl from '@utils/getEventIdByUrl';
import getEventPageUrlByEnvironment from '@utils/getEventPageUrlByEnvironment';
import getImageUrl from '@utils/getImageUrl';

type UserShareEventProps = {
  eventName: string;
  allMembers: string[];
};

const useShareEvent = ({eventName, allMembers}: UserShareEventProps) => {
  const eventId = getEventIdByUrl();
  const url = getEventPageUrlByEnvironment(eventId, 'home');

  const shareInfo = {
    title: `${allMembers.join(', ')}\n행동대장이 ${eventName}에 대한 정산을 요청했어요 :)`,
    text: '아래 링크에 접속해서 정산 내역을 확인해 주세요!',
    url,
  };

  const shareText = `${shareInfo.title}\n${shareInfo.text}\n${url}`;

  const copyShare = async () => {
    await window.navigator.clipboard.writeText(shareText);
  };

  const kakaoShare = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareInfo.title,
        description: shareInfo.text,
        imageUrl: getImageUrl('share-image', 'png'),
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttonTitle: '정산 확인하기',
    });
  };

  return {
    kakaoShare,
    copyShare,
  };
};

export default useShareEvent;
