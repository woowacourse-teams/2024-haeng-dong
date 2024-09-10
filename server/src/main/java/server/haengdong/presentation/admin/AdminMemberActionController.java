package server.haengdong.presentation.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.MemberActionService;
import server.haengdong.presentation.request.MemberInActionsSaveRequest;
import server.haengdong.presentation.request.MemberOutActionsSaveRequest;

@RequiredArgsConstructor
@RestController
public class AdminMemberActionController {

    private final MemberActionService memberActionService;

    @PostMapping("/api/admin/events/{eventId}/member-actions/in")
    public ResponseEntity<Void> saveMemberInAction(
            @PathVariable("eventId") String token,
            @RequestBody MemberInActionsSaveRequest request
    ) {
        memberActionService.saveMemberInAction(token, request.members());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/admin/events/{eventId}/member-actions/out")
    public ResponseEntity<Void> saveMemberOutAction(
            @PathVariable("eventId") String token,
            @RequestBody MemberOutActionsSaveRequest request
    ) {
        memberActionService.saveMemberOutAction(token, request.memberIds());

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
