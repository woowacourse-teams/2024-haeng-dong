import {EventName} from 'types/createEvent';

import {useAmplitudeStore} from '@store/amplitudeStore';

import detectBrowser from '@utils/detectBrowser';

type EventUniqueData = {
  eventName: EventName;
  eventToken: string;
};

type ShareMethod = 'link' | 'kakao';

export type EventSummary = EventUniqueData & {
  totalExpenseAmount: number; // 총 지출금액
  allMembersCount: number; // 행사에 참여한 총 인원
  billsCount: number; // 총 지출내역 수
  isAdmin: boolean; // 관리자 여부
  shareMethod: ShareMethod; // 공유 방법
};

type SendMethod = 'clipboard' | 'toss' | 'kakaopay';

type SendMoneyData = EventUniqueData & {
  sendMethod: SendMethod;
  amount: number;
};

const useAmplitude = () => {
  const {amplitude} = useAmplitudeStore();
  const domainEnv = process.env.NODE_ENV;

  const track = (eventName: string, eventProps: Record<string, any> = {}) => {
    amplitude.track(eventName, {
      domain: domainEnv,
      browser: detectBrowser(),
      ...eventProps,
    });
  };

  const trackStartCreateEvent = () => {
    track('정산 시작하기 버튼 클릭');
  };

  const trackCompleteCreateEvent = (eventUniqueData: EventUniqueData) => {
    track('이벤트 생성 완료', {
      ...eventUniqueData,
    });
  };

  const trackCompleteCreateMemberEvent = (eventUniqueData: EventUniqueData) => {
    track('회원 이벤트 생성 완료', {
      ...eventUniqueData,
    });
  };

  const trackShareEvent = (eventSummary: EventSummary) => {
    track('이벤트 초대 클릭', {
      ...eventSummary,
    });
  };

  const trackAddBillStart = (eventUniqueData: EventUniqueData) => {
    track('지출내역 추가 시작', {
      ...eventUniqueData,
    });
  };

  const trackAddBillEnd = (eventUniqueData: EventUniqueData) => {
    track('지출내역 추가 완료', {
      ...eventUniqueData,
    });
  };

  const trackSendMoney = (sendMoneyData: SendMoneyData) => {
    track('송금 버튼 클릭', {
      ...sendMoneyData,
    });
  };

  return {
    trackStartCreateEvent,
    trackCompleteCreateEvent,
    trackCompleteCreateMemberEvent,
    trackShareEvent,
    trackAddBillStart,
    trackAddBillEnd,
    trackSendMoney,
  };
};

export default useAmplitude;
