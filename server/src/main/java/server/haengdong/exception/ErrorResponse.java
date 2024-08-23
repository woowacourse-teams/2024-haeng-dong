package server.haengdong.exception;

public record ErrorResponse(
        HaengdongErrorCode errorCode,
        String message
) {

    public static ErrorResponse of(HaengdongErrorCode errorCode) {
        return new ErrorResponse(errorCode, errorCode.getMessage());
    }

    public static ErrorResponse of(HaengdongErrorCode errorCode, String message) {
        return new ErrorResponse(errorCode, message);
    }
}
