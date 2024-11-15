package server.haengdong.application;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.haengdong.application.response.KakaoTokenResponse;

@RequiredArgsConstructor
@Service
public class KakaoUserService {

    private static final String NICKNAME_KEY = "nickname";

    private final UserService userService;
    private final KakaoClient kakaoClient;

    public Long joinByKakao(String code) {
        KakaoTokenResponse kakaoToken = kakaoClient.join(code);
        String idToken = kakaoToken.idToken();
        DecodedJWT decodedJWT = JWT.decode(idToken);

        String memberNumber = decodedJWT.getSubject();
        String nickname = decodedJWT.getClaim(NICKNAME_KEY).asString();

        return userService.join(memberNumber, nickname);
    }

    public URI getRedirectURI() {
        return kakaoClient.getKakaoPageURI();
    }
}
