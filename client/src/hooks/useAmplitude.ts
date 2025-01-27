import {track} from '@amplitude/analytics-browser';

import {BankName, EventName} from 'types/serviceType';

import {useAuthStore} from '@store/authStore';

import detectBrowser from '@utils/detectBrowser';

type EventUniqueData = {
  eventName: EventName;
  eventToken: string;
};

type ShareMethod = 'link' | 'kakao' | 'qr';

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

// A B 유저를 나누기 위해서 -> 추후에 사용
type UserAB = 'A' | 'B';

const useAmplitude = () => {
  const domainEnv = process.env.NODE_ENV;
  const {isKakaoUser} = useAuthStore();

  const trackEvent = (eventName: string, eventProps: Record<string, any> = {}) => {
    track({
      event_type: eventName,
      event_properties: {domain: domainEnv, browser: detectBrowser(), ...eventProps},
      user_properties: {isKakaoUser},
    });
  };

  // 1. 랜딩 페이지
  // 랜딩 페이지 최하단을 보는지에 대한 이벤트, 랜딩 페이지 컨텐츠를 다 확인하는지 궁금해서 추가
  const trackLandingPageBottomView = () => {
    trackEvent('랜딩 페이지 최하단 확인');
  };

  // 2. 행사 생성 관련
  const trackStartCreateEvent = ({login}: {login: boolean}) => {
    trackEvent('정산 시작하기 버튼 클릭', {
      login,
    });
  };

  // 카카오 유저는 전역적으로 체크하고 있음 (isKakaoUser = true + 생성 완료 이벤트 => 회원의 이벤트)
  const trackCompleteCreateEvent = (eventUniqueData: EventUniqueData) => {
    trackEvent('이벤트 생성 완료', {
      ...eventUniqueData,
    });
  };

  // 3. 이벤트 관리자 (관리자로 인정받을 수 있는 핵심 이벤트)
  const trackShareEvent = (eventSummary: EventSummary) => {
    trackEvent('이벤트 초대 클릭', {
      ...eventSummary,
    });
  };

  // 4. 지출내역 이벤트 (체류 시간을 활용하여 UX를 검증한 부분)
  const trackAddBillStart = (eventUniqueData: EventUniqueData) => {
    trackEvent('지출내역 추가 시작', {
      ...eventUniqueData,
    });
  };

  const trackAddBillEnd = (eventUniqueData: EventUniqueData) => {
    trackEvent('지출내역 추가 완료', {
      ...eventUniqueData,
    });
  };

  // 5. 이벤트 참여자
  // 송금 버튼 클릭 (참여자로 인정받을 수 있는 핵심 이벤트)
  const trackSendMoney = (sendMoneyData: SendMoneyData) => {
    trackEvent('송금 버튼 클릭', {
      ...sendMoneyData,
    });
  };

  // 참여자가 전체 지출내역을 확인하는지 체크
  const trackCheckStepList = () => {
    trackEvent('전체 지출 내역 클릭');
  };

  // 6. 참여자 입금관리
  // 한 번에 몇 명의 사용자를 입금처리하는지 확인 (수정완료 할 때 요청)
  // 한 번에 입금확인처리 vs 여러 번 입금확인처리
  const trackChangeDepositStatus = (numOfChangeDeposit: number) => {
    trackEvent('참여자 입금 상태 변경', {'참여자 입금 변경 수': numOfChangeDeposit});
  };

  // 참여자 이름을 몇 명 바꾸는 지 확인
  // 자주 변경되는지, 처음부터 사람들이 잘 입력해서 이 기능은 잘 쓰이지 않는지 분석하기 위해
  const trackChangeMemberName = (numOfChangeMemberName: number) => {
    trackEvent('전체 참여자 이름 변경', {'참여자 이름 변경된 수': numOfChangeMemberName});
  };

  // 7. 이벤트 이름 변경 이벤트
  const trackChangeEventName = (newEventName: string) => {
    trackEvent('행사 이름 변경', {newEventName});
  };

  // 8. 계좌번호 관련
  // 은행 선호도 조사 -> 어떤 은행을 많이 사용하는지 파악하여 선호가 높은 은행을 상위로 올려도 좋을 듯
  // 계좌번호를 설정하고 '확인' 버튼을 누를 때 사용할 예정
  const trackBankName = (bankName: BankName) => {
    trackEvent('은행 설정', {bankName});
  };

  // 9. 사진
  // 참여자가 행사 이미지를 확인하는 것은 Page viewed로 체크할 수 있음
  // 또한 관리자가 행사 이미지를 등록하러 많이 방문하는지 역시 Page Viewed로 체크할 수 있음
  // 관리자가 행사 이미지를 많이 등록하는지를 확인하고 싶어서
  const trackUploadImageCount = (imageCount: number) => {
    trackEvent('행사 이미지 등록', {imageCount});
  };

  // 10. 메인페이지
  // 본인의 이름을 얼마나 변경하는지 확인하기 위함
  const trackChangeUserName = () => {
    trackEvent('유저 이름 변경');
  };

  // 11. 주최했던 행사
  // 행사 삭제를 단일, 복수 어떤 방식으로 많이 하는지 궁금합니다. (사실 행사 삭제도 많이 할 지 의문이기도 합니다.)
  // 복수 : 편집하기 -> 체크박스 선택 -> 삭제완료
  // 단일 : 행사 진입 -> 행사 삭제
  const trackEventDelete = (method: 'single' | 'multi') => {
    trackEvent('행사 삭제', {'삭제 방법': method});
  };

  // 12. 설정 페이지
  // 탈퇴를 누르는 이벤트 (우리에겐 매우 좋지 않은 이벤트)
  const trackWithdraw = () => {
    trackEvent('회원 탈퇴');
  };

  return {
    trackLandingPageBottomView,
    trackStartCreateEvent,
    trackCompleteCreateEvent,
    trackShareEvent,
    trackCheckStepList,
    trackChangeDepositStatus,
    trackChangeMemberName,
    trackChangeEventName,
    trackUploadImageCount,
    trackChangeUserName,
    trackBankName,
    trackWithdraw,
    trackAddBillStart,
    trackEventDelete,
    trackAddBillEnd,
    trackSendMoney,
  };
};

export default useAmplitude;
