import RULE from './rule';

type ErrorMessage = Record<string, string>;

export const SERVER_ERROR_MESSAGES: ErrorMessage = {
  // 행사 관련 에러 코드
  EVENT_NAME_LENGTH_INVALID: `행사 이름의 길이는 2자 이상 ${RULE.maxEventNameLength}자 이하만 가능해요.`,
  EVENT_NAME_CONSECUTIVE_SPACES: '행사 이름에는 공백 문자가 연속될 수 없어요.',
  EVENT_PASSWORD_FORMAT_INVALID: `비밀번호는 ${RULE.maxEventPasswordLength}자리의 숫자만 가능해요.`,
  EVENT_NOT_FOUND: '존재하지 않는 행사에요. 링크가 올바른지 확인해주세요.',

  // 멤버 관련 에러 코드
  MEMBER_NAME_LENGTH_INVALID: `멤버 이름은 한글 ${RULE.maxEventNameLength}자까지, 영어 ${RULE.maxEventNameLength * 2}자까지 입력 가능해요.`,

  MEMBER_NAME_CHANGE_DUPLICATE: '요청 본문에 중복된 이름이 존재해요. \n(ex. [이상, 이상, 감자, 백호])',
  MEMBER_NAME_DUPLICATE: '요청 본문에 중복된 이름이 존재해요. \n(ex. [이상, 이상, 감자, 백호])',
  MEMBER_ALREADY_EXIST: '이미 행사에 참여중인 인원이에요. \n겹치지 않도록 다른 이름을 사용해주세요.',

  MEMBER_NOT_EXIST: '현재 참여하고 있지 않은 인원이 존재해요',
  MEMBER_UPDATE_MISMATCH: '업데이트 요청된 참여자 정보와 기존 행사 참여자 정보가 일치하지 않아요.',

  // 지출 관련 에러 코드
  BILL_NOT_FOUND: '존재하지 않는 지출 액션이에요.',
  BILL_TITLE_INVALID: `지출 내역 이름은 1자 이상 ${RULE.maxBillNameLength} 이하여야 해요.`,
  BILL_PRICE_INVALID: `지출 금액은 ${RULE.maxPrice.toLocaleString('ko-KR')} 이하의 자연수여야 해요.`,
  BILL_DETAIL_NOT_FOUND: '존재하지 않는 참여자 지출입니다.',
  BILL_PRICE_NOT_MATCHED: '지출 총액이 일치하지 않아요.',
  DIFFERENT_STEP_MEMBERS: '회원 목록이 일치하지 않아요.',

  // 계좌 관련 에러 코드
  BANK_NAME_INVALID: '지원하지 않는 은행이에요. 다른 은행을 입력해주세요.',
  ACCOUNT_LENGTH_INVALID: `계좌 번호는 8자 이상 ${RULE.maxAccountNumberLength}자 이하로 입력 가능해요.`,

  // 로그인 관련 에러 코드
  TOKEN_NOT_FOUND: '로그인이 필요한 서비스에요.',
  TOKEN_EXPIRED: '로그인이 만료되었어요. 다시 로그인해주세요.',
  TOKEN_INVALID: '비밀번호를 올바르게 입력해주세요.',
  FORBIDDEN: '접근할 수 없는 행사에요.',
  PASSWORD_INVALID: '비밀번호를 올바르게 입력해주세요.',

  // 사용자에게 뜨면 안되며 프론트 구현 미스인 에러 코드
  MESSAGE_NOT_READABLE: '읽을 수 없는 요청이에요.',
  NO_RESOURCE_REQUEST: '존재하지 않는 자원이에요.',
  REQUEST_METHOD_NOT_SUPPORTED: '지원하지 않는 요청 메서드에요.',
  REQUEST_EMPTY: '요청 본문에 빈 값이 존재해요',

  // 예측할 수 없는 에러 코드
  INTERNAL_SERVER_ERROR: '서버 내부에 에러가 발생했습니다.',
  UNHANDLED: '알 수 없는 에러입니다.',
};

export const ERROR_MESSAGE = {
  eventName: SERVER_ERROR_MESSAGES.EVENT_NAME_LENGTH_INVALID,
  eventPasswordType: SERVER_ERROR_MESSAGES.EVENT_PASSWORD_FORMAT_INVALID,
  memberNameLength: `이름은 ${RULE.maxMemberNameLength}자까지 입력 가능해요.`,
  memberNameFormat: `이름은 한글, 영어만 가능해요.`,
  purchasePrice: `${RULE.maxPrice.toLocaleString('ko-kr')}원 이하의 숫자만 입력이 가능해요`,
  purchaseTitle: `지출 이름은 ${RULE.maxBillNameLength}자 이하의 한글, 영어, 숫자만 가능해요`,
  preventEmpty: '값은 비어있을 수 없어요',
  invalidInput: '올바르지 않은 입력이에요.',
  emptyBank: '계좌번호가 입력되지 않아서\n토스 송금 기능을 사용할 수 없어요',
  accountNumberFormat: '계좌번호는 숫자, 연속되지 않는 하이픈(-)만 입력 가능해요',
  accountNumberLength: `계좌번호는 ${RULE.minAccountNumberLength}자에서 ${RULE.maxAccountNumberLength}자 사이로 입력 가능해요`,
};
