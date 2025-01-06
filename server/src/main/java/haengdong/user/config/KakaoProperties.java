package haengdong.user.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("kakao")
public record KakaoProperties(
        String baseUri,
        String clientId,
        String tokenRequestUri,
        String unlinkRequestUri,
        String oauthCodeUri,
        String adminKey
) {
}
