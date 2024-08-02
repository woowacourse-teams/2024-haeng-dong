package server.haengdong.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillActionService;
import server.haengdong.presentation.request.BillActionsSaveRequest;
import server.haengdong.presentation.request.BillActionUpdateRequest;

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

    @PutMapping("/api/events/{eventId}/actions/bills/{actionId}")
    public ResponseEntity<Void> updateBillAction(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId,
            @Valid @RequestBody BillActionUpdateRequest request
    ) {
        billActionService.updateBillAction(token, actionId, request.toAppResponse());

        return ResponseEntity.ok()
                .build();
    }
}
