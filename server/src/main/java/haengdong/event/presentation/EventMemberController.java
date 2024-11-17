package haengdong.event.presentation;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import haengdong.event.application.EventMemberService;
import haengdong.event.application.response.MemberAppResponse;
import haengdong.event.presentation.response.CurrentMembersResponse;
import haengdong.event.presentation.response.MembersResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
public class EventMemberController {

    private final EventMemberService eventMemberService;

    @GetMapping("/api/events/{eventId}/members")
    public ResponseEntity<MembersResponse> findAllMembers(@PathVariable("eventId") String token) {
        MembersResponse response = MembersResponse.of(eventMemberService.findAllMembers(token));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/events/{eventId}/members/current")
    public ResponseEntity<CurrentMembersResponse> getCurrentMembers(@PathVariable("eventId") String token) {
        List<MemberAppResponse> currentMembers = eventMemberService.getCurrentMembers(token);

        return ResponseEntity.ok()
                .body(CurrentMembersResponse.of(currentMembers));
    }
}
