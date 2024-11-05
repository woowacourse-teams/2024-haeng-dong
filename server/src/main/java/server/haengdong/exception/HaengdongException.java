package server.haengdong.exception;

import lombok.Getter;

@Getter
public class HaengdongException extends RuntimeException {

    private final HaengdongErrorCode errorCode;

    public HaengdongException(HaengdongErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public HaengdongException(HaengdongErrorCode errorCode, Object... args) {
        super(String.format(errorCode.getMessage(), args));
        this.errorCode = errorCode;
    }

    public HaengdongException(HaengdongErrorCode errorCode, Throwable cause) {
        super(errorCode.getMessage(), cause);
        this.errorCode = errorCode;
    }
}
