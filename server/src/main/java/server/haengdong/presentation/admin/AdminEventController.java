package server.haengdong.presentation.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.EventService;
import server.haengdong.infrastructure.auth.CookieProperties;
import server.haengdong.presentation.request.MemberNamesUpdateRequest;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(CookieProperties.class)
@RestController
public class AdminEventController {

    private final EventService eventService;

    @PostMapping("/api/admin/events/{eventId}/auth")
    public ResponseEntity<Void> authenticate(@PathVariable("eventId") String token) {
        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/admin/events/{eventId}/members/nameChange")
    public ResponseEntity<Void> updateMember(
            @PathVariable("eventId") String token,
            @Valid @RequestBody MemberNamesUpdateRequest request
    ) {
        eventService.updateMember(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }
}
