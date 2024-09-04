package server.haengdong.presentation.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillActionDetailService;
import server.haengdong.application.BillActionService;
import server.haengdong.presentation.request.BillActionDetailsUpdateRequest;
import server.haengdong.presentation.request.BillActionUpdateRequest;
import server.haengdong.presentation.request.BillActionsSaveRequest;

@RequiredArgsConstructor
@RestController
public class AdminBillActionController {

    private final BillActionService billActionService;
    private final BillActionDetailService billActionDetailService;

    @PostMapping("/api/admin/events/{eventId}/bill-actions")
    public ResponseEntity<Void> saveAllBillAction(
            @PathVariable("eventId") String token,
            @Valid @RequestBody BillActionsSaveRequest request
    ) {
        billActionService.saveAllBillAction(token, request.toAppRequests());

        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/admin/events/{eventId}/bill-actions/{actionId}")
    public ResponseEntity<Void> updateBillAction(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId,
            @Valid @RequestBody BillActionUpdateRequest request
    ) {
        billActionService.updateBillAction(token, actionId, request.toAppResponse());

        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/admin/events/{eventId}/bill-actions/{actionId}/fixed")
    public ResponseEntity<Void> updateBillActionDetails(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId,
            @Valid @RequestBody BillActionDetailsUpdateRequest request
    ) {
        billActionDetailService.updateBillActionDetails(token, actionId, request.toAppRequest());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/admin/events/{eventId}/bill-actions/{actionId}")
    public ResponseEntity<Void> deleteBillAction(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId
    ) {
        billActionService.deleteBillAction(token, actionId);

        return ResponseEntity.ok().build();
    }
}
