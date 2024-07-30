package server.haengdong.exception;

import lombok.Getter;

@Getter
public enum HaengdongErrorCode {
    BAD_REQUEST("R_001", "잘못된 요청입니다."),
    NO_RESOURCE_REQUEST("R_002", "잘못된 엔드포인트입니다."),
    MESSAGE_NOT_READABLE("R_003", "읽을 수 없는 요청 형식입니다."),
    DUPLICATED_MEMBER_ACTION("MA_001", "중복된 인원이 존재합니다."),
    INVALID_MEMBER_ACTION("MA_002", "잘못된 맴버 액션입니다."),

    NOT_FOUND_EVENT("EV_400", "존재하지 않는 행사입니다."),

    INTERNAL_SERVER_ERROR("S_001", "서버 내부에서 에러가 발생했습니다."),
    ;

    private final String code;
    private final String message;

    HaengdongErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
