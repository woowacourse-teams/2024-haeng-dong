package server.haengdong.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.EventService;
import server.haengdong.presentation.request.EventSaveRequest;
import server.haengdong.presentation.response.EventDetailResponse;
import server.haengdong.presentation.response.EventResponse;
import server.haengdong.presentation.response.MembersResponse;
import server.haengdong.presentation.response.StepsResponse;

@RequiredArgsConstructor
@RestController
public class EventController {

    private final EventService eventService;

    @PostMapping("/api/events")
    public ResponseEntity<EventResponse> saveEvent(@Valid @RequestBody EventSaveRequest request) {
        EventResponse eventResponse = EventResponse.of(eventService.saveEvent(request.toAppRequest()));

        return ResponseEntity.ok(eventResponse);
    }

    @GetMapping("/api/events/{eventId}")
    public ResponseEntity<EventDetailResponse> findEvent(@PathVariable("eventId") String token) {
        EventDetailResponse eventDetailResponse = EventDetailResponse.of(eventService.findEvent(token));

        return ResponseEntity.ok(eventDetailResponse);
    }

    @GetMapping("/api/events/{eventId}/actions")
    public ResponseEntity<StepsResponse> findActions(@PathVariable("eventId") String token) {
        StepsResponse stepsResponse = StepsResponse.of(eventService.findActions(token));

        return ResponseEntity.ok(stepsResponse);
    }

    @GetMapping("/api/events/{eventId}/members")
    public ResponseEntity<MembersResponse> findAllMembers(@PathVariable("eventId") String token) {
        MembersResponse response = MembersResponse.of(eventService.findAllMembers(token));

        return ResponseEntity.ok(response);
    }
}
