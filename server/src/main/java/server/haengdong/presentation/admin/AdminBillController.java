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
import server.haengdong.application.BillDetailService;
import server.haengdong.application.BillService;
import server.haengdong.presentation.request.BillDetailsUpdateRequest;
import server.haengdong.presentation.request.BillSaveRequest;
import server.haengdong.presentation.request.BillUpdateRequest;

@RequiredArgsConstructor
@RestController
public class AdminBillController {
    private final BillService billService;

    private final BillDetailService billDetailService;

    @PostMapping("/api/admin/events/{eventId}/bills")
    public ResponseEntity<Void> saveAllBill(
            @PathVariable("eventId") String token,
            @Valid @RequestBody BillSaveRequest request
    ) {
        billService.saveBill(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/admin/events/{eventId}/bills/{billId}")
    public ResponseEntity<Void> deleteBill(
            @PathVariable("eventId") String token,
            @PathVariable("billId") Long billId
    ) {
        billService.deleteBill(token, billId);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/admin/events/{eventId}/bills/{billId}")
    public ResponseEntity<Void> updateBill(
            @PathVariable("eventId") String token,
            @PathVariable("billId") Long actionId,
            @Valid @RequestBody BillUpdateRequest request
    ) {
        billService.updateBill(token, actionId, request.toAppResponse());

        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/admin/events/{eventId}/bills/{billId}/fixed")
    public ResponseEntity<Void> updateBillDetails(
            @PathVariable("eventId") String token,
            @PathVariable("billId") Long actionId,
            @Valid @RequestBody BillDetailsUpdateRequest request
    ) {
        billDetailService.updateBillDetails(token, actionId, request.toAppRequest());

        return ResponseEntity.ok().build();
    }
}
