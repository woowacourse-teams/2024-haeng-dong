package server.haengdong.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum HaengdongErrorCode {
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
    NO_RESOURCE_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 엔드포인트입니다."),
    MESSAGE_NOT_READABLE(HttpStatus.BAD_REQUEST, "읽을 수 없는 요청 형식입니다."),
    DUPLICATED_MEMBER_ACTION(HttpStatus.BAD_REQUEST, "중복된 인원이 존재합니다."),
    INVALID_MEMBER_ACTION(HttpStatus.BAD_REQUEST, "잘못된 맴버 액션입니다."),

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
