package haengdong.common.auth.infrastructure;

import haengdong.common.auth.application.AuthService;
import haengdong.common.exception.AuthenticationException;
import haengdong.common.exception.HaengdongErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@RequiredArgsConstructor
public class AdminInterceptor implements HandlerInterceptor {

    public static final String LOGIN_MEMBER_REQUEST = "loginUserId";

    private static final String ADMIN_URI_REGEX = "/api/admin/events/([^/]+)";
    private static final Pattern ADMIN_URI_PATTERN = Pattern.compile(ADMIN_URI_REGEX);
    private static final int EVENT_TOKEN_MATCHER_INDEX = 1;

    private final AuthService authService;
    private final AuthenticationExtractor authenticationExtractor;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        HttpMethod method = HttpMethod.valueOf(request.getMethod());
        if (HttpMethod.OPTIONS.equals(method)) {
            return true;
        }
        validateToken(request);
        return true;
    }

    private void validateToken(HttpServletRequest request) {
        String jwt = authenticationExtractor.extract(request, authService.getTokenName());
        Long userId = authService.findUserIdByJWT(jwt);
        String uri = request.getRequestURI();
        Matcher matcher = ADMIN_URI_PATTERN.matcher(uri);
        if (!matcher.find()) {
            throw new AuthenticationException(HaengdongErrorCode.FORBIDDEN);
        }
        String eventToken = matcher.group(EVENT_TOKEN_MATCHER_INDEX);

        authService.checkAuth(eventToken, userId);
        request.setAttribute(LOGIN_MEMBER_REQUEST, userId);
    }
}
