package server.haengdong.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.AuthService;
import server.haengdong.application.EventService;
import server.haengdong.presentation.request.EventLoginRequest;
import server.haengdong.presentation.request.EventSaveRequest;
import server.haengdong.presentation.request.MemberUpdateRequest;
import server.haengdong.presentation.response.EventDetailResponse;
import server.haengdong.presentation.response.EventResponse;
import server.haengdong.presentation.response.MembersResponse;
import server.haengdong.presentation.response.StepsResponse;

@RequiredArgsConstructor
@RestController
public class EventController {

    private final EventService eventService;
    private final AuthService authService;

    @PostMapping("/api/events")
    public ResponseEntity<EventResponse> saveEvent(@Valid @RequestBody EventSaveRequest request) {
        EventResponse eventResponse = EventResponse.of(eventService.saveEvent(request.toAppRequest()));

        String jwtToken = authService.createToken(eventResponse.eventId());

        ResponseCookie responseCookie = createResponseCookie(jwtToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(eventResponse);
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

    @PutMapping("/api/events/{eventId}/members/{memberName}")
    public ResponseEntity<Void> updateMember(
            @PathVariable("eventId") String token,
            @PathVariable("memberName") String memberName,
            @Valid @RequestBody MemberUpdateRequest request
    ) {
        eventService.updateMember(token, memberName, request.toAppRequest());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/events/{eventId}/login")
    public ResponseEntity<Void> loginEvent(
            @PathVariable("eventId") String token,
            @Valid @RequestBody EventLoginRequest request
    ) {
        eventService.validatePassword(request.toAppRequest(token));
        String jwtToken = authService.createToken(token);

        ResponseCookie responseCookie = createResponseCookie(jwtToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }

    private ResponseCookie createResponseCookie(String token) {
        return ResponseCookie.from(authService.getTokenName(), token)
                .httpOnly(true)
//                .secure(true)
                .path("/")
                .maxAge(60)
//                .domain("haengdong.pro")
                .build();
    }
}
