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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.AuthService;
import server.haengdong.application.EventService;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventImageAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.infrastructure.auth.CookieProperties;
import server.haengdong.presentation.request.EventGuestSaveRequest;
import server.haengdong.presentation.request.EventLoginRequest;
import server.haengdong.presentation.response.EventDetailResponse;
import server.haengdong.presentation.response.EventImagesResponse;
import server.haengdong.presentation.response.EventResponse;
import server.haengdong.presentation.response.MemberBillReportsResponse;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(CookieProperties.class)
@RestController
public class EventController {

    private final EventService eventService;
    private final AuthService authService;
    private final CookieProperties cookieProperties;

    @GetMapping("/api/events/{eventId}")
    public ResponseEntity<EventDetailResponse> findEvent(@PathVariable("eventId") String token) {
        EventDetailResponse eventDetailResponse = EventDetailResponse.of(eventService.findEvent(token));

        return ResponseEntity.ok(eventDetailResponse);
    }

    @GetMapping("/api/events/{eventId}/reports")
    public ResponseEntity<MemberBillReportsResponse> getMemberBillReports(@PathVariable("eventId") String token) {
        List<MemberBillReportAppResponse> memberBillReports = eventService.getMemberBillReports(token);

        return ResponseEntity.ok()
                .body(MemberBillReportsResponse.of(memberBillReports));
    }

    @PostMapping("/api/events/guest")
    public ResponseEntity<EventResponse> saveEventGuest(@Valid @RequestBody EventGuestSaveRequest request) {
        EventAppResponse eventAppResponse = eventService.saveEventGuest(request.toAppRequest());
        EventResponse eventResponse = EventResponse.of(eventAppResponse);

        String jwtToken = authService.createGuestToken(eventAppResponse.userId());

        ResponseCookie responseCookie = createResponseCookie(jwtToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(eventResponse);
    }

    @PostMapping("/api/events/{eventId}/login")
    public ResponseEntity<Void> loginEvent(
            @PathVariable("eventId") String token,
            @Valid @RequestBody EventLoginRequest request
    ) {
        EventAppResponse response = eventService.findByGuestPassword(request.toAppRequest(token));
        String jwtToken = authService.createGuestToken(response.userId());

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

    @GetMapping("/api/events/{eventId}/images")
    public ResponseEntity<EventImagesResponse> findAllImages(@PathVariable("eventId") String token) {
        List<EventImageAppResponse> images = eventService.findImages(token);

        return ResponseEntity.ok(EventImagesResponse.of(images));
    }
}
