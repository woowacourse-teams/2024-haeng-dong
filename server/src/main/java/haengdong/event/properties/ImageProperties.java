package haengdong.event.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("image")
public record ImageProperties(
        String bucket,
        String directory,
        String baseUrl
) {
}
