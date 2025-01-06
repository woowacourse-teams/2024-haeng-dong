package haengdong.common.exception;

import lombok.Getter;

@Getter
public enum HaengdongErrorCode {

    /* Domain */

    EVENT_NOT_FOUND("존재하지 않는 행사입니다."),
    EVENT_NAME_LENGTH_INVALID("행사 이름은 %d자 이상 %d자 이하만 입력 가능합니다."),
    EVENT_NAME_CONSECUTIVE_SPACES("행사 이름에는 공백 문자가 연속될 수 없습니다."),
    EVENT_PASSWORD_FORMAT_INVALID("비밀번호는 %d자리 숫자만 가능합니다."),
    BANK_NAME_INVALID("지원하지 않는 은행입니다. 지원하는 은행 목록: %s"),
    ACCOUNT_LENGTH_INVALID("계좌번호는 %d자 이상 %d자 이하만 입력 가능합니다."),
    IMAGE_UPLOAD_FAIL("이미지 업로드에 실패했습니다."),

    MEMBER_NAME_LENGTH_INVALID("참여자 이름은 %d자 이상 %d자 이하만 입력 가능합니다."),
    MEMBER_NAME_DUPLICATE("행사에 중복된 참여자 이름이 존재합니다."),
    MEMBER_NOT_FOUND("존재하지 않는 참여자입니다."),
    MEMBER_ALREADY_EXIST("현재 참여하고 있는 인원이 존재합니다."),
    MEMBER_NAME_CHANGE_DUPLICATE("중복된 참여 인원 이름 변경 요청이 존재합니다."),
    MEMBER_UPDATE_MISMATCH("업데이트 요청된 참여자 ID 목록과 기존 행사 참여자 ID 목록이 일치하지 않습니다."),

    BILL_NOT_FOUND("존재하지 않는 지출입니다."),
    BILL_TITLE_INVALID("앞뒤 공백을 제거한 지출 내역 제목은 %d ~ %d자여야 합니다."),
    BILL_PRICE_INVALID("지출 금액은 %,d 이하의 자연수여야 합니다."),
    BILL_DETAIL_NOT_FOUND("존재하지 않는 참여자 지출입니다."),
    BILL_PRICE_NOT_MATCHED("지출 총액이 일치하지 않습니다."),

    DIFFERENT_STEP_MEMBERS("참여자 목록이 일치하지 않습니다."),

    IMAGE_NOT_FOUND("존재하지 않는 이미지 입니다."),
    IMAGE_COUNT_INVALID("이미지 수량은 %d개 까지 업로드할 수 있습니다."),

    /* Authentication */

    PASSWORD_INVALID("비밀번호가 일치하지 않습니다."),

    TOKEN_NOT_FOUND("토큰이 존재하지 않습니다."),
    TOKEN_INVALID("유효하지 않은 토큰입니다."),

    FORBIDDEN("접근할 수 없는 행사입니다."),

    KAKAO_LOGIN_FAIL("카카오 인증에 실패했습니다."),
    KAKAO_UNLINK_FAIL("카카오 회원 탈퇴에 실패했습니다."),

    /* Request Validation */

    REQUEST_EMPTY("입력 값은 공백일 수 없습니다.")

    /* System */,

    MESSAGE_NOT_READABLE("읽을 수 없는 요청입니다."),
    REQUEST_METHOD_NOT_SUPPORTED("지원하지 않는 요청 메서드입니다."),
    NO_RESOURCE_REQUEST("존재하지 않는 자원입니다."),
    INTERNAL_SERVER_ERROR("서버 내부에서 에러가 발생했습니다."),
    ;

    private final String message;

    HaengdongErrorCode(String message) {
        this.message = message;
    }
}
