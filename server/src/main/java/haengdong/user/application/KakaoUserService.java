package haengdong.user.application;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import haengdong.user.application.response.KakaoTokenResponse;

@Slf4j
@RequiredArgsConstructor
@Service
public class KakaoUserService {

    private static final String NICKNAME_KEY = "nickname";

    private final UserService userService;
    private final KakaoClient kakaoClient;

    public Long joinByKakao(String code, String redirectUri) {
        KakaoTokenResponse kakaoToken = kakaoClient.join(code, redirectUri);
        String idToken = kakaoToken.idToken();
        DecodedJWT decodedJWT = JWT.decode(idToken);

        String memberNumber = decodedJWT.getSubject();
        String nickname = decodedJWT.getClaim(NICKNAME_KEY).asString();

        log.info("로그인 성공 : {}, {}, {}", code, memberNumber, nickname);

        return userService.join(memberNumber, nickname);
    }

    public String getClientId() {
        return kakaoClient.getClientId();
    }
}
