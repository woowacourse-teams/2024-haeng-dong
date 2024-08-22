package server.haengdong.presentation;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
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
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.infrastructure.auth.CookieProperties;
import server.haengdong.presentation.request.EventLoginRequest;
import server.haengdong.presentation.request.EventSaveRequest;
import server.haengdong.presentation.request.MemberNamesUpdateRequest;
import server.haengdong.presentation.response.ActionsResponse;
import server.haengdong.presentation.response.EventDetailResponse;
import server.haengdong.presentation.response.EventResponse;
import server.haengdong.presentation.response.MembersResponse;
import server.haengdong.presentation.response.StepsResponse;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(CookieProperties.class)
@RestController
public class EventController {

    private final EventService eventService;
    private final AuthService authService;
    private final CookieProperties cookieProperties;

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

    @GetMapping("/api/events/{eventId}/actions/v2")
    public ResponseEntity<ActionsResponse> findActions2(@PathVariable("eventId") String token) {
        List<ActionAppResponse> actions = eventService.findActions(token);
        ActionsResponse actionsResponse = ActionsResponse.of(actions);

        return ResponseEntity.ok(actionsResponse);
    }

    @GetMapping("/api/events/{eventId}/members")
    public ResponseEntity<MembersResponse> findAllMembers(@PathVariable("eventId") String token) {
        MembersResponse response = MembersResponse.of(eventService.findAllMembers(token));

        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/events/{eventId}/members/nameChange")
    public ResponseEntity<Void> updateMember(
            @PathVariable("eventId") String token,
            @Valid @RequestBody MemberNamesUpdateRequest request
    ) {
        eventService.updateMember(token, request.toAppRequest());

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

    @PostMapping("/api/events/{eventId}/auth")
    public ResponseEntity<Void> authenticate(@PathVariable("eventId") String token) {
        return ResponseEntity.ok().build();
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
