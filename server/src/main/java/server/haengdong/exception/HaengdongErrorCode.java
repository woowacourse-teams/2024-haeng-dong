package server.haengdong.exception;

import lombok.Getter;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.Password;

@Getter
public enum HaengdongErrorCode {

    /* Domain */

    EVENT_NOT_FOUND("존재하지 않는 행사입니다."),
    EVENT_NAME_LENGTH_INVALID(String.format("행사 이름은 %d자 이상 %d자 이하만 입력 가능합니다.",
            Event.MIN_NAME_LENGTH,
            Event.MAX_NAME_LENGTH)),
    EVENT_NAME_CONSECUTIVE_SPACES("행사 이름에는 공백 문자가 연속될 수 없습니다."),
    EVENT_PASSWORD_FORMAT_INVALID(String.format("비밀번호는 %d자리 숫자만 가능합니다.", Password.PASSWORD_LENGTH)),
    ACCOUNT_LENGTH_INVALID(String.format("계좌번호는 %d자 이상 %d자 이하만 입력 가능합니다.",
            Event.MIN_ACCOUNT_NUMBER_LENGTH,
            Event.MAX_ACCOUNT_NUMBER_LENGTH)),

    MEMBER_NAME_LENGTH_INVALID(String.format("멤버 이름은 %d자 이상 %d자 이하만 입력 가능합니다.",
            Member.MIN_NAME_LENGTH,
            Member.MAX_NAME_LENGTH)),
    MEMBER_NAME_DUPLICATE("중복된 행사 참여 인원 이름이 존재합니다."),
    MEMBER_NOT_FOUND("존재하지 않는 참여자입니다."),
    MEMBER_NAME_CHANGE_DUPLICATE("중복된 참여 인원 이름 변경 요청이 존재합니다."),

    BILL_NOT_FOUND("존재하지 않는 지출입니다."),
    BILL_TITLE_INVALID(String.format("앞뒤 공백을 제거한 지출 내역 제목은 %d ~ %d자여야 합니다.",
            Bill.MIN_TITLE_LENGTH,
            Bill.MAX_TITLE_LENGTH)),
    BILL_PRICE_INVALID(String.format("지출 금액은 %,d 이하의 자연수여야 합니다.", Bill.MAX_PRICE)),
    BILL_DETAIL_NOT_FOUND("존재하지 않는 참여자 지출입니다."),
    BILL_PRICE_NOT_MATCHED("지출 총액이 일치하지 않습니다."),

    /* Authentication */

    PASSWORD_INVALID("비밀번호가 일치하지 않습니다."),

    TOKEN_NOT_FOUND("토큰이 존재하지 않습니다."),
    TOKEN_EXPIRED("만료된 토큰입니다."),
    TOKEN_INVALID("유효하지 않은 토큰입니다."),

    FORBIDDEN("접근할 수 없는 행사입니다."),

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
