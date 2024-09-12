package server.haengdong.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillDetailService;
import server.haengdong.application.response.BillDetailsAppResponse;
import server.haengdong.presentation.response.BillDetailsResponse;

@RequiredArgsConstructor
@RestController
public class BillDetailController {

    private final BillDetailService billDetailService;

    @GetMapping("/api/events/{eventId}/bills/{billId}/fixed")
    public ResponseEntity<BillDetailsResponse> findBillDetails(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId
    ) {
        BillDetailsAppResponse appResponse = billDetailService.findBillDetails(token, actionId);

        return ResponseEntity.ok(BillDetailsResponse.of(appResponse));
    }
}
