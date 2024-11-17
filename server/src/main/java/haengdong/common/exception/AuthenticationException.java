package haengdong.common.exception;

import lombok.Getter;

@Getter
public class AuthenticationException extends RuntimeException {

    private final HaengdongErrorCode errorCode;
    private final String message;

    public AuthenticationException(HaengdongErrorCode errorCode) {
        this(errorCode, errorCode.getMessage());
    }

    public AuthenticationException(HaengdongErrorCode errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }
}
