package server.haengdong.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> haengdongException() {
        return ResponseEntity.badRequest()
                .body(ErrorResponse.of(HaengdongErrorCode.BAD_REQUEST));
    }

    @ExceptionHandler(HaengdongException.class)
    public ResponseEntity<ErrorResponse> haengdongException(HaengdongException e) {
        return ResponseEntity.status(e.getStatusCode())
                .body(ErrorResponse.of(e.getErrorCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error(e.getMessage(), e);
        return ResponseEntity.internalServerError()
                .body(ErrorResponse.of(HaengdongErrorCode.INTERNAL_SERVER_ERROR));
    }
}
