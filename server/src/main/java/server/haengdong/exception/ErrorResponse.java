package server.haengdong.exception;

public record ErrorResponse(
        String code,
        String message
) {

    public static ErrorResponse of(HaengdongErrorCode errorCode) {
        return new ErrorResponse(errorCode.getCode(), errorCode.getMessage());
    }

    public static ErrorResponse of(HaengdongErrorCode errorCode, String message){
        return new ErrorResponse(errorCode.getCode(), message);
    }
}
