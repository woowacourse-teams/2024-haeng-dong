package haengdong.user.application;

import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.user.application.response.KakaoTokenResponse;
import haengdong.user.config.KakaoProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(KakaoProperties.class)
@Component
public class KakaoClient {

    private final KakaoProperties kakaoProperties;
    private final RestClient restClient;

    public KakaoTokenResponse join(String code, String redirectUri) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoProperties.clientId());
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        try {
            return restClient.post()
                    .uri(kakaoProperties.baseUri() + kakaoProperties.tokenRequestUri())
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                    .body(params)
                    .retrieve()
                    .body(KakaoTokenResponse.class);
        } catch (Exception e) {
            log.info("로그인 실패 : {}", code);
            throw new HaengdongException(HaengdongErrorCode.KAKAO_LOGIN_FAIL, e);
        }
    }

    public String getClientId() {
        return kakaoProperties.clientId();
    }

    public void unlink(String memberNumber) {
        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
        formData.add("target_id_type", "user_id");
        formData.add("target_id", Long.parseLong(memberNumber));

        try {
            String responseBody = restClient.post()
                    .uri(kakaoProperties.unlinkRequestUri())
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .header(HttpHeaders.AUTHORIZATION, "KakaoAK " + kakaoProperties.adminKey())
                    .body(formData)
                    .retrieve()
                    .body(String.class);

            log.info("카카오 회원 탈퇴: {}", responseBody);
        } catch (Exception e) {
            throw new HaengdongException(HaengdongErrorCode.KAKAO_UNLINK_FAIL, e);
        }
    }
}
