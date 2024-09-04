package server.haengdong.presentation;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.MemberActionService;
import server.haengdong.application.response.CurrentMemberAppResponse;
import server.haengdong.presentation.response.CurrentMembersResponse;

@RequiredArgsConstructor
@RestController
public class MemberActionController {

    private final MemberActionService memberActionService;

    @GetMapping("/api/events/{eventId}/members/current")
    public ResponseEntity<CurrentMembersResponse> getCurrentMembers(@PathVariable("eventId") String token) {
        List<CurrentMemberAppResponse> currentMembers = memberActionService.getCurrentMembers(token);

        return ResponseEntity.ok()
                .body(CurrentMembersResponse.of(currentMembers));
    }
}
