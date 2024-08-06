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

        String token = authService.createToken(eventResponse.eventId());

        // TODO : 배포 환경 별로 설정 값 다르게하기
        ResponseCookie responseCookie = ResponseCookie.from(authService.getTokenName(), token)
                .httpOnly(true)
//                .secure(true)
                .path("/")
                .maxAge(60)
//                .domain("haengdong.pro")
                .build();

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
}
