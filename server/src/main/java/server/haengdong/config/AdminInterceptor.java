package server.haengdong.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import server.haengdong.application.AuthService;
import server.haengdong.exception.AuthenticationException;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.infrastructure.auth.AuthenticationExtractor;

@Slf4j
public class AdminInterceptor implements HandlerInterceptor {

    private final AuthService authService;
    private final AuthenticationExtractor authenticationExtractor;

    public AdminInterceptor(AuthService authService, AuthenticationExtractor authenticationExtractor) {
        this.authService = authService;
        this.authenticationExtractor = authenticationExtractor;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String requestURI = request.getRequestURI();

        if (requestURI.endsWith("/login")) {
            return true; // 요청을 계속 진행하도록 허용
        }

        HttpMethod method = HttpMethod.valueOf(request.getMethod());
        if (HttpMethod.GET.equals(method) || HttpMethod.OPTIONS.equals(method)) {
            return true;
        }

        validateToken(request);

        return true;
    }

    private void validateToken(HttpServletRequest request) {
        String token = authenticationExtractor.extract(request, authService.getTokenName());
        String tokenEventId = authService.findEventIdByToken(token);
        String eventId = request.getRequestURI().split("/")[3];
        if (!tokenEventId.equals(eventId)) {
            log.warn("[행사 접근 불가] Cookie EventId = {}, URL EventId = {}", tokenEventId, eventId);
            throw new AuthenticationException(HaengdongErrorCode.FORBIDDEN);
        }
    }
}
