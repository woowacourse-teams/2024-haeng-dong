package server.haengdong.presentation.admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.infrastructure.auth.CookieProperties;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(CookieProperties.class)
@RestController
public class AdminEventController {

    @PostMapping("/api/admin/events/{eventId}/auth")
    public ResponseEntity<Void> authenticate() {
        return ResponseEntity.ok().build();
    }
}
