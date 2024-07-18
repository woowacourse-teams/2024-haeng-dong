package server.haengdong.presentation;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.EventService;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.presentation.request.EventSaveRequest;

@RequiredArgsConstructor
@RestController
public class EventController {

    private final EventService eventService;

    @PostMapping("/api/events")
    public ResponseEntity<Void> saveEvent(EventSaveRequest request) {
        EventAppResponse eventAppResponse = eventService.saveEvent(request.toAppRequest());

        return ResponseEntity.ok()
                .location(URI.create("events/" + eventAppResponse.token()))
                .build();
    }
}
