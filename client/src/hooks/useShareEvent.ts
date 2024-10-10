import {useNavigate} from 'react-router-dom';

import {Event} from 'types/serviceType';

import {useAuthStore} from '@store/authStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import getEventPageUrlByEnvironment from '@utils/getEventPageUrlByEnvironment';
import getDeletedLastPath from '@utils/getDeletedLastPath';

import toast from './useToast/toast';

type UserShareEventProps = {
  event: Event;
  isMobile: boolean;
};

const useShareEvent = ({event, isMobile}: UserShareEventProps) => {
  const {eventName, bankName, accountNumber} = event;
  const eventId = getEventIdByUrl();
  const url = getEventPageUrlByEnvironment(eventId, 'home');
  const navigate = useNavigate();
  const {isAdmin} = useAuthStore();

  const shareInfo = {
    title: `[행동대장]\n${eventName}에 대한 정산을 시작할게요:)`,
    text: '아래 링크에 접속해서 정산 내역을 확인해 주세요!',
    url,
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

  const onShareButtonClick = () => {
    const isReady = bankName !== '' && accountNumber !== '';

    // induceBankInfoBeforeShare
    if (!isReady && isAdmin) {
      toast.error('잠깐! 정산을 초대하기 전에\n계좌를 등록해주세요', {
        showingTime: 3000,
        position: 'bottom',
      });

      const navigatePath = `${getDeletedLastPath(location.pathname)}/admin/edit`;
      navigate(navigatePath);
      return;
    }

    if (!isReady && !isAdmin) {
      toast.error('정산자가 계좌를 등록해야 초대 가능합니다.\n정산자에게 문의해주세요', {
        showingTime: 3000,
        position: 'bottom',
      });
      return;
    }

    // 모바일이 아닌 기기는 단순 텍스트 복사
    // 모바일 기기에서는 카카오톡 공유를 사용
    if (!isMobile) return;
    kakaoShare();
  };

  return {
    shareText,
    onShareButtonClick,
  };
};

export default useShareEvent;
