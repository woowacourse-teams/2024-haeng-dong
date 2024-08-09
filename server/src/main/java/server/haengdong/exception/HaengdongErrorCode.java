package server.haengdong.exception;

import lombok.Getter;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.event.Event;

@Getter
public enum HaengdongErrorCode {

    /* Domain */

    EVENT_NOT_FOUND("존재하지 않는 행사입니다."),
    EVENT_NAME_LENGTH_INVALID(String.format("행사 이름은 %d자 이상 %d자 이하만 입력 가능합니다.",
            Event.MIN_NAME_LENGTH,
            Event.MAX_NAME_LENGTH)),
    EVENT_NAME_CONSECUTIVE_SPACES("행사 이름에는 공백 문자가 연속될 수 없습니다. 입력한 이름 : %s"),
    EVENT_PASSWORD_FORMAT_INVALID(String.format("비밀번호는 %d자리 숫자만 가능합니다.", Event.PASSWORD_LENGTH)),

    ACTION_NOT_FOUND("존재하지 않는 액션입니다."),

    MEMBER_NAME_LENGTH_INVALID(String.format("멤버 이름은 %d자 이상 %d자 이하만 입력 가능합니다.",
            MemberAction.MIN_NAME_LENGTH,
            MemberAction.MAX_NAME_LENGTH)),
    MEMBER_NAME_DUPLICATE("중복된 행사 참여 인원 이름이 존재합니다."),
    MEMBER_NOT_EXIST("현재 참여하고 있지 않는 인원이 존재합니다."),
    MEMBER_ALREADY_EXIST("현재 참여하고 있는 인원이 존재합니다."),
    MEMBER_NAME_CHANGE_DUPLICATE("중복된 참여 인원 이름 변경 요청이 존재합니다."),

    MEMBER_ACTION_NOT_FOUND("존재하지 않는 멤버 액션입니다."),
    MEMBER_ACTION_STATUS_INVALID("멤버 액션은 IN, OUT만 가능합니다. 입력한 멤버 액션: %s"),

    BILL_ACTION_NOT_FOUND("존재하지 않는 지출 액션입니다."),
    BILL_ACTION_TITLE_INVALID(String.format("앞뒤 공백을 제거한 지출 내역 제목은 %d ~ %d자여야 합니다.",
            BillAction.MIN_TITLE_LENGTH,
            BillAction.MAX_TITLE_LENGTH)),
    BILL_ACTION_PRICE_INVALID(String.format("지출 금액은 %,d 이하의 자연수여야 합니다.", BillAction.MAX_PRICE)),

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
    NO_RESOURCE_REQUEST("존재하지 않는 자원입니다."),
    INTERNAL_SERVER_ERROR("서버 내부에서 에러가 발생했습니다.");

    private final String message;

    HaengdongErrorCode(String message) {
        this.message = message;
    }
}
