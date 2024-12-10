package haengdong.common.properties;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("cookie")
public record CookieProperties(
        boolean httpOnly,
        boolean secure,
        String domain,
        String path,
        String sameSite,
        Duration maxAge
) {
}
