package server.haengdong.exception;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

@Getter
public class HaengdongException extends RuntimeException {

    private final HaengdongErrorCode errorCode;
    private final String message;

    public HaengdongException(HaengdongErrorCode errorCode) {
        this(errorCode, null);
    }

    public HaengdongException(HaengdongErrorCode errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    public HttpStatusCode getStatusCode() {
        return errorCode.getHttpStatus();
    }

    @Override
    public String getMessage() {
        if (message == null) {
            return errorCode.getMessage();
        }
        return message;
    }
}
