package server.haengdong.presentation.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.MemberService;
import server.haengdong.presentation.request.MemberNamesUpdateRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AdminMemberController {

    private final MemberService memberService;

    @PutMapping("/api/admin/events/{eventId}/members/nameChange")
    public ResponseEntity<Void> updateMember(
            @PathVariable("eventId") String token,
            @Valid @RequestBody MemberNamesUpdateRequest request
    ) {
        memberService.updateMember(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/admin/events/{eventId}/members/{memberId}")
    public ResponseEntity<Void> deleteMember(
            @PathVariable("eventId") String token,
            @PathVariable("memberId") Long memberId
    ) {
        memberService.deleteMember(token, memberId);

        return ResponseEntity.ok().build();
    }
}
