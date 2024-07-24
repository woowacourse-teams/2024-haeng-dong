package server.haengdong.presentation;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.EventService;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.presentation.request.EventSaveRequest;
import server.haengdong.presentation.response.EventDetailResponse;

@RequiredArgsConstructor
@RestController
public class EventController {

    private final EventService eventService;

    @PostMapping("/api/events")
    public ResponseEntity<Void> saveEvent(@RequestBody EventSaveRequest request) {
        EventAppResponse eventAppResponse = eventService.saveEvent(request.toAppRequest());

        return ResponseEntity.ok()
                .location(URI.create("events/" + eventAppResponse.token()))
                .build();
    }

    @GetMapping("/api/events/{eventId}")
    public ResponseEntity<EventDetailResponse> findEvent(@PathVariable("eventId") String token) {
        EventDetailResponse eventDetailResponse = EventDetailResponse.of(eventService.findEvent(token));

        return ResponseEntity.ok(eventDetailResponse);
    }
}
