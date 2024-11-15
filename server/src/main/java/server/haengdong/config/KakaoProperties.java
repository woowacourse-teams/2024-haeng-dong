package server.haengdong.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("kakao")
public record KakaoProperties(
        String baseUri,
        String clientId,
        String redirectUri,
        String tokenRequestUri,
        String oauthCodeUri
) {
}
