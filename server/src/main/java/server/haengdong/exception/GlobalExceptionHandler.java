package server.haengdong.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String LOG_FORMAT = """
            \n\t{
                "RequestURI": "{} {}",
                "RequestBody": {},
                "ErrorMessage": "{}"
            \t}
            """;

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> authenticationException(HttpServletRequest req, AuthenticationException e) {
        log.warn(LOG_FORMAT, req.getMethod(), req.getRequestURI(), getRequestBody(req), e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.of(e.getErrorCode()));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> noResourceException(HttpRequestMethodNotSupportedException e) {
        log.warn(e.getMessage(), e);
        return ResponseEntity.badRequest()
                .body(ErrorResponse.of(HaengdongErrorCode.REQUEST_METHOD_NOT_SUPPORTED));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> noResourceException(NoResourceFoundException e) {
        log.warn(e.getMessage(), e);
        return ResponseEntity.badRequest()
                .body(ErrorResponse.of(HaengdongErrorCode.NO_RESOURCE_REQUEST));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> httpMessageNotReadableException(HttpMessageNotReadableException e) {
        log.warn(e.getMessage(), e);
        return ResponseEntity.badRequest()
                .body(ErrorResponse.of(HaengdongErrorCode.MESSAGE_NOT_READABLE));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.warn(e.getMessage(), e);
        String errorMessage = e.getFieldErrors().stream()
                .map(error -> error.getField() + " " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return ResponseEntity.badRequest()
                .body(ErrorResponse.of(HaengdongErrorCode.REQUEST_EMPTY, errorMessage));
    }

    @ExceptionHandler(HaengdongException.class)
    public ResponseEntity<ErrorResponse> haengdongException(HttpServletRequest req, HaengdongException e) {
        log.warn(LOG_FORMAT, req.getMethod(), req.getRequestURI(), getRequestBody(req), e.getMessage(), e);
        return ResponseEntity.badRequest()
                .body(ErrorResponse.of(e.getErrorCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(HttpServletRequest req, Exception e) {
        log.error(LOG_FORMAT, req.getMethod(), req.getRequestURI(), getRequestBody(req), e.getMessage(), e);
        return ResponseEntity.internalServerError()
                .body(ErrorResponse.of(HaengdongErrorCode.INTERNAL_SERVER_ERROR));
    }

    private String getRequestBody(HttpServletRequest req) {
        try (BufferedReader reader = req.getReader()) {
            return reader.lines().collect(Collectors.joining(System.lineSeparator() + "\t"));
        } catch (IOException e) {
            log.error("Failed to read request body", e);
            return "";
        }
    }
}
