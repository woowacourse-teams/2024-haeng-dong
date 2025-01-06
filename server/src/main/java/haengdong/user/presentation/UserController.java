package haengdong.user.presentation;

import haengdong.event.application.response.UserAppResponse;
import haengdong.user.presentation.response.UserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import haengdong.common.auth.application.AuthService;
import haengdong.user.application.KakaoUserService;
import haengdong.user.application.UserService;
import haengdong.common.auth.Login;
import haengdong.common.properties.CookieProperties;
import haengdong.user.presentation.request.UserUpdateRequest;
import haengdong.user.presentation.response.KakaoClientId;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(CookieProperties.class)
@Controller
public class UserController {

    private final UserService userService;
    private final KakaoUserService kakaoUserService;
    private final AuthService authService;
    private final CookieProperties cookieProperties;

    @PatchMapping("/api/users")
    public ResponseEntity<Void> updateUser(
            @Login Long userId,
            @Valid @RequestBody UserUpdateRequest request
    ) {
        userService.updateUser(request.toAppRequest(userId));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/kakao-client-id")
    public ResponseEntity<KakaoClientId> getKakaoClientId() {
        String clientId = kakaoUserService.getClientId();
        KakaoClientId kakaoClientId = new KakaoClientId(clientId);

        return ResponseEntity.ok(kakaoClientId);
    }

    @GetMapping("/api/login/kakao")
    public ResponseEntity<Void> kakaoLogin(
            @RequestParam String code,
            @RequestParam("redirect_uri") String redirectUri
    ) {
        log.info("Kakao login code, redirectUri: {}, {}", code, redirectUri);
        Long userId = kakaoUserService.joinByKakao(code, redirectUri);
        String jwtToken = authService.createMemberToken(userId);

        ResponseCookie responseCookie = createResponseCookie(jwtToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }

    @GetMapping("/api/users/mine")
    public ResponseEntity<UserResponse> findUser(@Login Long userId) {
        UserAppResponse response = userService.findById(userId);
        return ResponseEntity.ok(UserResponse.of(response));
    }

    @DeleteMapping("/api/users")
    public ResponseEntity<Void> deleteUser(@Login Long userId) {
        kakaoUserService.withdraw(userId);

        ResponseCookie responseCookie = expireCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }

    private ResponseCookie expireCookie() {
        return ResponseCookie.from(authService.getTokenName(), null)
                .httpOnly(cookieProperties.httpOnly())
                .secure(cookieProperties.secure())
                .domain(cookieProperties.domain())
                .path(cookieProperties.path())
                .sameSite(cookieProperties.sameSite())
                .maxAge(0L)
                .build();
    }

    private ResponseCookie createResponseCookie(String token) {
        return ResponseCookie.from(authService.getTokenName(), token)
                .httpOnly(cookieProperties.httpOnly())
                .secure(cookieProperties.secure())
                .domain(cookieProperties.domain())
                .path(cookieProperties.path())
                .sameSite(cookieProperties.sameSite())
                .maxAge(cookieProperties.maxAge())
                .build();
    }
}
