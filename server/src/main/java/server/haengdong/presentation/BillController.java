package server.haengdong.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillService;
import server.haengdong.application.response.BillDetailsAppResponse;
import server.haengdong.presentation.response.BillDetailsResponse;
import server.haengdong.presentation.response.StepsResponse;

@RequiredArgsConstructor
@RestController
public class BillController {

    private final BillService billService;

    @GetMapping("/api/events/{eventId}/bills")
    public ResponseEntity<StepsResponse> findBills(@PathVariable("eventId") String token) {
        StepsResponse stepsResponse = StepsResponse.of(billService.findSteps(token));

        return ResponseEntity.ok(stepsResponse);
    }

    @GetMapping("/api/events/{eventId}/bills/{billId}/details")
    public ResponseEntity<BillDetailsResponse> findBillDetails(
            @PathVariable("eventId") String token,
            @PathVariable("billId") Long billId
    ) {
        BillDetailsAppResponse appResponse = billService.findBillDetails(token, billId);

        return ResponseEntity.ok(BillDetailsResponse.of(appResponse));
    }
}
