package server.haengdong.presentation;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.ActionService;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.presentation.response.MemberBillReportsResponse;

@RequiredArgsConstructor
@RestController
public class ActionController {

    private final ActionService actionService;

    @GetMapping("/api/events/{eventId}/actions/reports")
    public ResponseEntity<MemberBillReportsResponse> getMemberBillReports(@PathVariable("eventId") String token) {
        List<MemberBillReportAppResponse> memberBillReports = actionService.getMemberBillReports(token);

        return ResponseEntity.ok()
                .body(MemberBillReportsResponse.of(memberBillReports));
    }
}
