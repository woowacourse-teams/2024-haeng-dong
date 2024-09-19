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
import server.haengdong.application.BillService;
import server.haengdong.presentation.request.BillDetailsUpdateRequest;
import server.haengdong.presentation.request.BillSaveRequest;
import server.haengdong.presentation.request.BillUpdateRequest;

@RequiredArgsConstructor
@RestController
public class AdminBillController {

    private final BillService billService;

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
            @PathVariable("billId") Long billId,
            @Valid @RequestBody BillUpdateRequest request
    ) {
        billService.updateBill(token, billId, request.toAppResponse());

        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/admin/events/{eventId}/bills/{billId}/details")
    public ResponseEntity<Void> updateBillDetails(
            @PathVariable("eventId") String token,
            @PathVariable("billId") Long billId,
            @Valid @RequestBody BillDetailsUpdateRequest request
    ) {
        billService.updateBillDetails(token, billId, request.toAppRequest());

        return ResponseEntity.ok().build();
    }
}
