package server.haengdong.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.MemberActionService;
import server.haengdong.presentation.request.MemberActionsSaveRequest;

@RequiredArgsConstructor
@RestController
public class MemberActionController {

    private final MemberActionService memberActionService;

    @PostMapping("/api/events/{token}/actions/members")
    public ResponseEntity<Void> saveMemberAction(
            @PathVariable("token") String token,
            @RequestBody MemberActionsSaveRequest request
    ) {
        memberActionService.saveMemberAction(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }
}
