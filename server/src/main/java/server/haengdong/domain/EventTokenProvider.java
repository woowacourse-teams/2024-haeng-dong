package server.haengdong.domain;

import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class EventTokenProvider {

    public String createToken() {
        return UUID.randomUUID().toString();
    }
}
