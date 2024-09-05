package server.haengdong.presentation.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.MemberActionService;
import server.haengdong.presentation.request.MemberActionsSaveRequest;

@RequiredArgsConstructor
@RestController
public class AdminMemberActionController {

    private final MemberActionService memberActionService;

    @PostMapping("/api/admin/events/{eventId}/member-actions")
    public ResponseEntity<Void> saveMemberAction(
            @PathVariable("eventId") String token,
            @RequestBody MemberActionsSaveRequest request
    ) {
        memberActionService.saveMemberAction(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/admin/events/{eventId}/members/{memberName}")
    public ResponseEntity<Void> deleteMember(
            @PathVariable("eventId") String token,
            @PathVariable("memberName") String memberName
    ) {
        memberActionService.deleteMember(token, memberName);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/admin/events/{eventId}/member-actions/{actionId}")
    public ResponseEntity<Void> deleteMemberAction(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId
    ) {
        memberActionService.deleteMemberAction(token, actionId);

        return ResponseEntity.ok().build();
    }
}
