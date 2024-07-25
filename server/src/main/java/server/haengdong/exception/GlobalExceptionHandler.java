package server.haengdong.exception;

import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> haengdongException() {
        return ResponseEntity.badRequest()
                .body(ErrorResponse.of(HaengdongErrorCode.BAD_REQUEST.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String errorMessage = e.getFieldErrors().stream()
                .map(error -> error.getField() + " " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return ResponseEntity.badRequest()
                .body(ErrorResponse.of(errorMessage));
    }

    @ExceptionHandler(HaengdongException.class)
    public ResponseEntity<ErrorResponse> haengdongException(HaengdongException e) {
        return ResponseEntity.status(e.getStatusCode())
                .body(ErrorResponse.of(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error(e.getMessage(), e);
        return ResponseEntity.internalServerError()
                .body(ErrorResponse.of(HaengdongErrorCode.INTERNAL_SERVER_ERROR.getMessage()));
    }
}
