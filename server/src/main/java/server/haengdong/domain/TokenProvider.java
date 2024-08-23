package server.haengdong.domain;

import java.util.Map;

public interface TokenProvider {

    String createToken(Map<String, Object> payload);

    Map<String, Object> getPayload(String token);

    boolean validateToken(String token);
}
