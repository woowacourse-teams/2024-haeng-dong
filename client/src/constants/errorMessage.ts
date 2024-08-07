type ErrorMessage = Record<string, string>;

const ERROR_MESSAGES: ErrorMessage = {
  EVENT_NOT_FOUND: '존재하지 않는 행사입니다.',
  EVENT_NAME_LENGTH_INVALID: '행사 이름은 2자 이상 30자 이하만 입력 가능합니다.',
  EVENT_NAME_CONSECUTIVE_SPACES: '행사 이름에는 공백 문자가 연속될 수 없습니다.',
  EVENT_PASSWORD_FORMAT_INVALID: '비밀번호는 4자리 숫자만 가능합니다.',

  ACTION_NOT_FOUND: '존재하지 않는 액션입니다.',

  MEMBER_NAME_LENGTH_INVALID: '멤버 이름은 1자 이상 4자 이하만 입력 가능합니다.',
  MEMBER_NAME_DUPLICATE: '중복된 행사 참여 인원 이름이 존재합니다.',
  MEMBER_NOT_EXIST: '현재 참여하고 있지 않은 인원이 존재합니다.',
  MEMBER_ALREADY_EXIST: '현재 참여하고 있는 인원이 존재합니다.',

  MEMBER_ACTION_NOT_FOUND: '존재하지 않는 멤버 액션입니다.',
  MEMBER_ACTION_STATUS_INVALID: '유효하지 않은 멤버 액션 상태입니다.',

  BILL_ACTION_NOT_FOUND: '존재하지 않는 지출 액션입니다.',
  BILL_ACTION_TITLE_INVALID: '앞뒤 공백을 제거한 지출 내역 제목은 %d자 ~ %d자여야 합니다.',
  BILL_ACTION_PRICE_INVALID: '지출 금액은 10,000,000 이하의 자연수여야 합니다.',

  REQUEST_EMPTY: '입력 값은 공백일 수 없습니다.',
  MESSAGE_NOT_READABLE: '읽을 수 없는 요청입니다.',
  NO_RESOURCE_REQUEST: '존재하지 않는 자원입니다.',

  INTERNAL_SERVER_ERROR: '서버 내부에 에러가 발생했습니다.',

  PASSWORD_INVALID: '비밀번호가 일치하지 않습니다.',
  TOKEN_NOT_FOUND: '토큰이 존재하지 않습니다.',
  TOKEN_EXPIRED: '만료된 토큰입니다.',
  TOKEN_INVALID: '유효하지 않은 토큰입니다.',
  FORBIDDEN: '접근할 수 없는 행사입니다.',
};

export default ERROR_MESSAGES;
