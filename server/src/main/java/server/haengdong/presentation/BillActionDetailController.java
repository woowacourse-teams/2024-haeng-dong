package server.haengdong.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillActionDetailService;
import server.haengdong.application.response.BillActionDetailsAppResponse;
import server.haengdong.presentation.response.BillActionDetailsResponse;

@RequiredArgsConstructor
@RestController
public class BillActionDetailController {

    private final BillActionDetailService billActionDetailService;

    @GetMapping("/api/events/{eventId}/bill-actions/{actionId}/fixed")
    public ResponseEntity<BillActionDetailsResponse> findBillActionDetails(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId
    ) {
        BillActionDetailsAppResponse appResponse = billActionDetailService.findBillActionDetails(token, actionId);

        return ResponseEntity.ok(BillActionDetailsResponse.of(appResponse));
    }
}
