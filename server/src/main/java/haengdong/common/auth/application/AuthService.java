package haengdong.common.auth.application;


import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import haengdong.event.application.EventService;
import haengdong.common.auth.TokenProvider;
import haengdong.user.domain.Role;
import haengdong.common.exception.AuthenticationException;
import haengdong.common.exception.HaengdongErrorCode;

@Slf4j
public class AuthService {

    private static final String TOKEN_NAME = "accessToken";
    private static final String CLAIM_SUB = "sub";
    private static final String ROLE = "role";

    private final TokenProvider tokenProvider;
    private final EventService eventService;

    public AuthService(TokenProvider tokenProvider, EventService eventService) {
        this.tokenProvider = tokenProvider;
        this.eventService = eventService;
    }

    public String createGuestToken(Long userId) {
        Map<String, Object> payload = Map.of(CLAIM_SUB, userId, ROLE, Role.GUEST);

        return tokenProvider.createToken(payload);
    }

    public String createMemberToken(Long userId) {
        Map<String, Object> payload = Map.of(CLAIM_SUB, userId, ROLE, Role.MEMBER);

        return tokenProvider.createToken(payload);
    }

    public Long findUserIdByToken(String token) {
        validateToken(token);
        Map<String, Object> payload = tokenProvider.getPayload(token);
        return ((Integer) payload.get(CLAIM_SUB)).longValue();
    }

    private void validateToken(String token) {
        if (!tokenProvider.validateToken(token)) {
            throw new AuthenticationException(HaengdongErrorCode.TOKEN_INVALID);
        }
    }

    public String getTokenName() {
        return TOKEN_NAME;
    }

    public void checkAuth(String eventToken, Long userId) {
        boolean hasEvent = eventService.existsByTokenAndUserId(eventToken, userId);

        if (!hasEvent) {
            log.warn("[행사 접근 불가] Cookie EventId = {}, UserId = {}", eventToken, userId);
            throw new AuthenticationException(HaengdongErrorCode.FORBIDDEN);
        }
    }
}
