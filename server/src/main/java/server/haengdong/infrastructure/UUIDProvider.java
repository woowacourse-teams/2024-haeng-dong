package server.haengdong.infrastructure;

import java.util.UUID;
import org.springframework.stereotype.Component;
import server.haengdong.domain.RandomValueProvider;

@Component
public class UUIDProvider implements RandomValueProvider {

    public String createRandomValue() {
        return UUID.randomUUID().toString();
    }
}
