package haengdong.event.presentation;

import haengdong.common.auth.Login;
import haengdong.common.auth.application.AuthService;
import haengdong.common.properties.CookieProperties;
import haengdong.event.application.EventImageFacadeService;
import haengdong.event.application.EventService;
import haengdong.event.application.request.EventAppRequest;
import haengdong.event.application.request.EventDeleteAppRequest;
import haengdong.event.application.request.EventMineAppResponse;
import haengdong.event.application.response.EventAppResponse;
import haengdong.event.application.response.EventImageUrlAppResponse;
import haengdong.event.application.response.MemberBillReportAppResponse;
import haengdong.event.presentation.request.EventDeleteRequest;
import haengdong.event.presentation.request.EventGuestSaveRequest;
import haengdong.event.presentation.request.EventLoginRequest;
import haengdong.event.presentation.request.EventSaveRequest;
import haengdong.event.presentation.response.EventDetailResponse;
import haengdong.event.presentation.response.EventImagesResponse;
import haengdong.event.presentation.response.EventResponse;
import haengdong.event.presentation.response.EventsMineResponse;
import haengdong.event.presentation.response.MemberBillReportsResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(CookieProperties.class)
@RestController
public class EventController {

    private final EventService eventService;
    private final AuthService authService;
    private final CookieProperties cookieProperties;
    private final EventImageFacadeService eventImageFacadeService;

    @GetMapping("/api/events/{eventId}")
    public ResponseEntity<EventDetailResponse> findEvent(@PathVariable("eventId") String token) {
        EventDetailResponse eventDetailResponse = EventDetailResponse.of(eventService.findEvent(token));

        return ResponseEntity.ok(eventDetailResponse);
    }

    @GetMapping("/api/events/mine")
    public ResponseEntity<EventsMineResponse> findMyEvents(@Login Long userId) {
        List<EventMineAppResponse> responses = eventService.findByUserId(userId);

        return ResponseEntity.ok(EventsMineResponse.of(responses));
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

    @PostMapping("/api/events")
    public ResponseEntity<EventResponse> saveEvent(@Login Long userId, @Valid @RequestBody EventSaveRequest request) {
        EventResponse eventResponse = EventResponse.of(eventService.saveEvent(new EventAppRequest(request.eventName(), userId)));
        return ResponseEntity.ok(eventResponse);
    }

    @DeleteMapping("/api/events")
    public ResponseEntity<Void> deleteEvent(@Login Long userId, @RequestBody EventDeleteRequest request) {
        eventService.deleteEvents(new EventDeleteAppRequest(userId, request.eventIds()));

        return ResponseEntity.ok().build();
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
        List<EventImageUrlAppResponse> images = eventImageFacadeService.findImages(token);

        return ResponseEntity.ok(EventImagesResponse.of(images));
    }
}
