package haengdong.event.infrastructure;

import java.util.UUID;
import org.springframework.stereotype.Component;
import haengdong.event.domain.RandomValueProvider;

@Component
public class UUIDProvider implements RandomValueProvider {

    public String createRandomValue() {
        return UUID.randomUUID().toString();
    }
}
