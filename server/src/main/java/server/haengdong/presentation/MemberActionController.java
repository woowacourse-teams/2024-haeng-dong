package server.haengdong.presentation;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.MemberActionService;
import server.haengdong.application.response.CurrentMemberAppResponse;
import server.haengdong.presentation.request.MemberActionsSaveRequest;
import server.haengdong.presentation.response.CurrentMembersResponse;

@RequiredArgsConstructor
@RestController
public class MemberActionController {

    private final MemberActionService memberActionService;

    @PostMapping("/api/events/{eventId}/actions/members")
    public ResponseEntity<Void> saveMemberAction(
            @PathVariable("eventId") String token,
            @RequestBody MemberActionsSaveRequest request
    ) {
        memberActionService.saveMemberAction(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/events/{eventId}/members/current")
    public ResponseEntity<CurrentMembersResponse> getCurrentMembers(@PathVariable("eventId") String token) {
        List<CurrentMemberAppResponse> currentMembers = memberActionService.getCurrentMembers(token);

        return ResponseEntity.ok()
                .body(CurrentMembersResponse.of(currentMembers));
    }

    @DeleteMapping("/api/events/{eventId}/actions/{actionId}/members")
    public ResponseEntity<Void> deleteMemberAction(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId
    ) {
        memberActionService.deleteMemberAction(token, actionId);

        return ResponseEntity.ok().build();
    }
}
