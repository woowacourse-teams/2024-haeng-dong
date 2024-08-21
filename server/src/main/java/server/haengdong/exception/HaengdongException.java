package server.haengdong.exception;

import lombok.Getter;

@Getter
public class HaengdongException extends RuntimeException {

    private final HaengdongErrorCode errorCode;
    private final String message;

    public HaengdongException(HaengdongErrorCode errorCode) {
        this(errorCode, errorCode.getMessage());
    }

    public HaengdongException(HaengdongErrorCode errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }
}
