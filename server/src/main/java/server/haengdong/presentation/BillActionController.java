package server.haengdong.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillActionService;
import server.haengdong.presentation.request.BillActionsSaveRequest;

@RequiredArgsConstructor
@RestController
public class BillActionController {

    private final BillActionService billActionService;

    @PostMapping("/api/events/{eventId}/actions/bills")
    public ResponseEntity<Void> saveAllBillAction(
            @PathVariable("eventId") String token,
            @RequestBody @Valid BillActionsSaveRequest request
    ) {
        billActionService.saveAllBillAction(token, request.toAppRequests());

        return ResponseEntity.ok()
                .build();
    }

    @DeleteMapping("/api/events/{eventId}/actions/{actionId}/bills")
    public ResponseEntity<Void> deleteBillAction(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId
    ) {
        billActionService.deleteBillAction(token, actionId);

        return ResponseEntity.ok()
                .build();
    }
}
