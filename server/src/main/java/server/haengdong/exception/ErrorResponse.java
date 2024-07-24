package server.haengdong.exception;

public record ErrorResponse(
        String message
) {

    public static ErrorResponse of(HaengdongErrorCode errorCode) {
        return new ErrorResponse(errorCode.getMessage());
    }
}
