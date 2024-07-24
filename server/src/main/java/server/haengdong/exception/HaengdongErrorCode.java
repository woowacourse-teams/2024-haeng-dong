package server.haengdong.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum HaengdongErrorCode {
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
    DUPLICATED_MEMBER_ACTION(HttpStatus.BAD_REQUEST, "올바르지 않은 인원 요청입니다."),
    INVALID_MEMBER_ACTION(HttpStatus.BAD_REQUEST, "잘못된 맴버 액션입니다."),
    INVALID_BILL_ACTION_SIZE(HttpStatus.BAD_REQUEST, "앞뒤 공백을 제거한 지출 내역 제목은 2 ~ 30자여야 합니다."),
    INVALID_PRICE_SIZE(HttpStatus.BAD_REQUEST, "지출 금액은 10,000,000 이하의 자연수여야 합니다."),

    NOT_FOUND_EVENT(HttpStatus.NOT_FOUND, "존재하지 않는 행사입니다."),

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부에서 에러가 발생했습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

    HaengdongErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
