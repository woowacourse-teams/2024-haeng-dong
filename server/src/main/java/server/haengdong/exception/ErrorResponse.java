package server.haengdong.exception;

public record ErrorResponse(
        String errorCode,
        String message
) {

    public static ErrorResponse of(HaengdongErrorCode errorCode) {
        return new ErrorResponse(errorCode.name(), errorCode.getMessage());
    }

    public static ErrorResponse of(HaengdongErrorCode errorCode, String message) {
        return new ErrorResponse(errorCode.name(), message);
    }
}
