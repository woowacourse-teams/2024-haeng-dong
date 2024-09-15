package server.haengdong.presentation.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.EventService;
import server.haengdong.presentation.request.EventUpdateRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AdminEventController {

    private final EventService eventService;

    @PostMapping("/api/admin/events/{eventId}/auth")
    public ResponseEntity<Void> authenticate() {
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/api/admin/events/{eventId}")
    public ResponseEntity<Void> updateEvent(
            @PathVariable("eventId") String token,
            @Valid @RequestBody EventUpdateRequest request
    ) {
        eventService.updateEvent(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }
}
