package server.haengdong.presentation;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.MemberService;
import server.haengdong.application.response.LastBillMemberAppResponse;
import server.haengdong.presentation.response.CurrentMembersResponse;
import server.haengdong.presentation.response.MembersResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/api/events/{eventId}/members")
    public ResponseEntity<MembersResponse> findAllMembers(@PathVariable("eventId") String token) {
        MembersResponse response = MembersResponse.of(memberService.findAllMembers(token));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/events/{eventId}/members/current")
    public ResponseEntity<CurrentMembersResponse> getCurrentMembers(@PathVariable("eventId") String token) {
        List<LastBillMemberAppResponse> currentMembers = memberService.getLastMembers(token);

        return ResponseEntity.ok()
                .body(CurrentMembersResponse.of(currentMembers));
    }
}
