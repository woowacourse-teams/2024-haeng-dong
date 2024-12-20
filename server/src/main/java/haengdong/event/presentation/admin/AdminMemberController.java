package haengdong.event.presentation.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import haengdong.event.application.EventMemberService;
import haengdong.event.application.response.MembersSaveAppResponse;
import haengdong.event.presentation.request.MembersSaveRequest;
import haengdong.event.presentation.request.MembersUpdateRequest;
import haengdong.event.presentation.response.MembersSaveResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AdminMemberController {

    private final EventMemberService eventMemberService;

    @PostMapping("/api/admin/events/{eventId}/members")
    public ResponseEntity<MembersSaveResponse> saveMembers(
            @PathVariable("eventId") String token,
            @Valid @RequestBody MembersSaveRequest request
    ) {
        MembersSaveAppResponse response = eventMemberService.saveMembers(token, request.toAppRequest());

        return ResponseEntity.ok(MembersSaveResponse.of(response));
    }

    @PutMapping("/api/admin/events/{eventId}/members")
    public ResponseEntity<Void> updateMembers(
            @PathVariable("eventId") String token,
            @Valid @RequestBody MembersUpdateRequest request
    ) {
        eventMemberService.updateMembers(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/admin/events/{eventId}/members/{memberId}")
    public ResponseEntity<Void> deleteMember(
            @PathVariable("eventId") String token,
            @PathVariable("memberId") Long memberId
    ) {
        eventMemberService.deleteMember(token, memberId);

        return ResponseEntity.ok().build();
    }
}
