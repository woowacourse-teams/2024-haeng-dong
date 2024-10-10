import {useAmplitudeStore} from '@store/amplitudeStore';

type EventUniqueData = {
  eventName: string;
  eventToken: string;
};

type EventSummary = EventUniqueData & {
  totalExpenseAmount: number; // 총 지출금액
  allMembersCount: number; // 행사에 참여한 총 인원
  billsCount: number; // 총 지출내역 수
  isAdmin: boolean; // 관리자 여부
};

type AddBillDwellTimeInEvent = EventUniqueData & {
  dwellTime: number;
};

const useAmplitude = () => {
  const {amplitude} = useAmplitudeStore();
  const domainEnv = process.env.NODE_ENV;

  const track = (eventName: string, eventProps: Record<string, any> = {}) => {
    amplitude.track(eventName, {
      domain: domainEnv,
      ...eventProps,
    });
  };

  const trackStartCreateEvent = () => {
    track('정산 시작하기 버튼 클릭');
  };

  const trackCompleteCreateEvent = ({eventName, eventToken}: EventUniqueData) => {
    track('이벤트 생성 완료', {
      eventName,
      eventToken,
    });
  };

  const trackShareEventByAdmin = (eventSummary: EventSummary) => {
    track('이벤트 초대 클릭', {
      ...eventSummary,
    });
  };

  const trackAddBillDwellTime = (data: AddBillDwellTimeInEvent) => {
    track('지출내역 추가 시작부터 완료까지 체류시간', {
      ...data,
    });
  };

  return {trackStartCreateEvent, trackCompleteCreateEvent, trackShareEventByAdmin, trackAddBillDwellTime};
};

export default useAmplitude;
