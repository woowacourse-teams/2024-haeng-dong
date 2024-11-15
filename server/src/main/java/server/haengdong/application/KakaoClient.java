package server.haengdong.application;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import server.haengdong.application.response.KakaoTokenResponse;
import server.haengdong.config.KakaoProperties;

@RequiredArgsConstructor
@EnableConfigurationProperties(KakaoProperties.class)
@Component
public class KakaoClient {

    private final KakaoProperties kakaoProperties;
    private final RestClient restClient;

    public KakaoTokenResponse join(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoProperties.clientId());
        params.add("redirect_uri", kakaoProperties.redirectUri());
        params.add("code", code);

        KakaoTokenResponse kakaoToken = restClient.post()
                .uri(kakaoProperties.baseUri() + kakaoProperties.tokenRequestUri())
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .body(params)
                .retrieve()
                .body(KakaoTokenResponse.class);

        return kakaoToken;
    }

    public URI getKakaoPageURI() {
        return URI.create(kakaoProperties.oauthCodeUri().formatted(kakaoProperties.clientId(), kakaoProperties.redirectUri()));
    }
}
