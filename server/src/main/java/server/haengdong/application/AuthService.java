package server.haengdong.application;


import java.util.Map;
import server.haengdong.domain.TokenProvider;
import server.haengdong.exception.AuthenticationException;

public class AuthService {

    private static final String TOKEN_NAME = "eventToken";
    private static final String CLAIM_SUB = "sub";

    private final TokenProvider tokenProvider;

    public AuthService(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    public String createToken(String eventId) {
        Map<String, Object> payload = Map.of(CLAIM_SUB, eventId);

        return tokenProvider.createToken(payload);
    }

    public String findEventIdByToken(String token) {
        validateToken(token);
        Map<String, Object> payload = tokenProvider.getPayload(token);
        return (String) payload.get(CLAIM_SUB);
    }

    private void validateToken(String token) {
        if (!tokenProvider.validateToken(token)) {
            throw new AuthenticationException();
        }
    }

    public String getTokenName() {
        return TOKEN_NAME;
    }
}
