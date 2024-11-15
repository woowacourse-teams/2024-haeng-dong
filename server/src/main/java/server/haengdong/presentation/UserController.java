package server.haengdong.presentation;

import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import server.haengdong.application.AuthService;
import server.haengdong.application.KakaoUserService;
import server.haengdong.application.UserService;
import server.haengdong.config.Login;
import server.haengdong.infrastructure.auth.CookieProperties;
import server.haengdong.presentation.request.UserUpdateRequest;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(CookieProperties.class)
@Controller
public class UserController {

    private final UserService userService;
    private final KakaoUserService kakaoUserService;
    private final AuthService authService;
    private final CookieProperties cookieProperties;

    @PatchMapping("/api/admin/users")
    public ResponseEntity<Void> updateUser(
            @Login Long userId,
            @Valid @RequestBody UserUpdateRequest request
    ) {
        userService.updateUser(request.toAppRequest(userId));

        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/login/kakao-page")
    public ResponseEntity<Void> kakaoPage() {
        URI redirectURI = kakaoUserService.getRedirectURI();

        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .location(redirectURI)
                .build();
    }

    @GetMapping("/api/login/kakao")
    public ResponseEntity<Void> kakaoLogin(@RequestParam String code) {
        log.info("Kakao login code: {}", code);
        Long userId = kakaoUserService.joinByKakao(code);
        String jwtToken = authService.createGuestToken(userId);

        ResponseCookie responseCookie = createResponseCookie(jwtToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
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
